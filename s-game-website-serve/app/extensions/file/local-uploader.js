const { Uploader } = require("lin-mizar/lin/file");
const { File } = require("lin-mizar");
const { config } = require("lin-mizar/lin/config");
const fs = require("fs");
const path = require("path");
const {
  NotFound
} = require("lin-mizar");

class LocalUploader extends Uploader {
  /**
   * 处理文件对象
   * { size, encoding, fieldname, filename, mimeType, data }
   */
  async upload(files, urlDir, _type) {
    const arr = [];
    for (const file of files) {
      // 由于stream的特性，当读取其中的数据时，它的buffer会被消费
      // 所以此处深拷贝一份计算md5值
      const md5 = this.generateMd5(file);
      const siteDomain = config.getItem("siteDomain", "http://localhost");
      // 检查md5存在
      const exist = await File.findOne({
        where: {
          md5: md5
        }
      });
      if (exist) {
        arr.push({
          key: file.fieldname,
          id: exist.id,
          path: `${exist.path}`,
          url: `${siteDomain}${urlDir}${exist.path}`
        });
      } else {
        const { absolutePath, relativePath, realName } = this.getStorePath(
          file.filename
        );
        const target = fs.createWriteStream(absolutePath);
        await target.write(file.data);
        const ext = path.extname(realName);
        const combineName = file.filename.split(".")[0] + "|" + realName.split(".")[0];
        const saved = await File.createRecord(
          {
            path: relativePath,
            type: _type,
            name: combineName,
            extension: ext,
            size: file.size,
            md5: md5
          },
          true
        );
        arr.push({
          key: file.fieldname,
          id: saved.id,
          path: `${saved.path}`,
          url: `${siteDomain}${urlDir}${saved.path}`
        });
      }
    }
    return arr;
  }

  async get(pageIndex = 1, perPageCount = 28, type = 1, desc = "id", urlDir) {
    const siteDomain = config.getItem("siteDomain", "http://localhost");
    let filter = {};
    if (type) filter.type = type;
    const files = await File.findAndCountAll({
      limit: perPageCount,
      offset: (pageIndex - 1) * perPageCount,
      where: filter,
      order: [
        [desc, "DESC"]
      ]
    });
    if (!files) {
      throw new NotFound({
        msg: "无法获取图片数据"
      });
    }

    let tempDate = {};
    tempDate.date = [];
    files.rows.forEach(item => {
      if (item) {
        tempDate.date.push({
          id: item.id,
          name: item.name,
          md5: item.md5,
          url: `${siteDomain}${urlDir}${item.path}`
        });
      }
    });

    tempDate.page_meta = {
      current_page_index: parseInt(pageIndex),
      per_page_count: perPageCount,
      total: files.count,
      total_page_count: Math.ceil(files.count / perPageCount)
    };
    return tempDate;
  }

  async delete(id) {
    const exist = await File.findByPk(id);
    if (!exist) {
      throw new NotFound({
        msg: "无法获取文件数据"
      });
    }

    const absolutePath = `${this.storeDir}/${exist.path}`;

    await fs.exists(absolutePath, async function(exists) {
      if (exists) {
        await fs.unlink(absolutePath, function(err) {
          if (err) {
            throw new NotFound({
              msg: "删除文件失败"
            });
          }
        });
      }
      else {
        throw new NotFound({
          msg: "无法获取文件数据"
        });
      }
    });

    await exist.destroy();
  }

  async getDownloadInfo(id) {
    const date = await File.findByPk(id);
    if (!date) {
      throw new NotFound({
        msg: "无法获取文件数据"
      });
    }
    const absolutePath = `${this.storeDir}/${date.path}`;
    const num = absolutePath.lastIndexOf("\/");
    const absoluteDir = absolutePath.substring(0, num);
    return {
      name: date.name,
      absoluteDir
    };
  }
}

module.exports = { LocalUploader };
