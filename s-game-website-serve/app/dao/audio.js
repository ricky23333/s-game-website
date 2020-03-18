const { Audio } = require("../models/audio");
const { Op, Sequelize } = require("sequelize");
const {
  NotFound
} = require("lin-mizar");

//DAO处理api传递过来的数据，并修改数据库
class AudioDao {
  static async getAudioList() {
    const date = await Audio.findAll({});
    if (!date) {
      throw  new NotFound("无法获取Audio数据");
    }

    const tempDateAry = [];

    date.forEach((item) => {
      let tempDate = {
        id: item.id,
        audio_name: item.audio_name,
        audio_url: item.audio_url,
        cover_url: item.cover_url
      };
      tempDateAry.push(tempDate);
    });
    return tempDateAry;
  }

  async getAudioListWithCms(v) {
    let page = v.get("query.page");
    let desc = v.get("query.desc") ? v.get("query.desc") : "id";
    let keyword = v.get("query.keyword");
    const perPageCount = 12;

    let filter = {};
    if (keyword) {
      filter = {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { article_describe: { [Op.like]: `%${keyword}%` } }
        ]
      };
    }

    let audios = await Audio.findAndCountAll({
      limit: perPageCount,
      offset: (page - 1) * perPageCount,
      where: filter,
      order: [
        [desc, "DESC"]
      ],
      paranoid: false
    });

    if (!audios) {
      throw  new NotFound("无法获取Audio数据");
    }

    const tempDateAry = [];
    if (audios.rows) audios = audios.rows;
    audios.forEach((item) => {
      let tempDate = {
        id: item.id,
        audio_name: item.audio_name,
        audio_url: item.audio_url,
        cover_url: item.cover_url,
        create_at: item.create_time,
        update_at: item.update_time,
        delete_at: item.delete_time
      };
      tempDateAry.push(tempDate);
    });
    return tempDateAry;
  }

  async createorUpdateAudioWithCms(v, isCreate, audioId) {
    let audio;

    if (isCreate) {
      audio = new Audio();
    }
    else {
      if (audioId) {
        audio = await Audio.findOne({
          where: {
            audioId
          },
          paranoid: false
        });
      }
    }

    if (!audio) {
      throw new NotFound({
        msg: "无法获取ID为" + id + "的音乐数据"
      });
    }

    audio.audio_name = v.get("body.audio_name");
    audio.audio_url = v.get("body.audio_url");
    audio.cover_url = v.get("body.cover_url");
    await audio.save();
    return audio;
  }

  async recoverAudioWithCms(v) {
    let id = v.get("body.id");
    let audio = await Audio.update({
      delete_time: null
    }, {
      where: {
        id
      },
      paranoid: false
    });

    if (!audio) {
      throw new NotFound({
        msg: "没有找到id为" + id + "的音乐"
      });
    }
  }

  async deleteAudioWithCms(id) {
    let audio = await Audio.findOne({
      where: {
        id
      },
      paranoid: false
    });
    if (!audio) {
      throw new NotFound({
        msg: "没有找到id为" + id + "的音乐"
      });
    }
    //已被软删除的数据再次删除将会被硬删除
    if (audio.delete_time) {
      await audio.destroy({
        force: true
      });
    } else {
      await audio.destroy();
    }
  }


}

module.exports = { AudioDao };
