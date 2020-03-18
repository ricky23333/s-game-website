const {CmsOption} = require("../models/cms-option");
const {
    NotFound,
} = require('lin-mizar');

//DAO处理api传递过来的数据，并修改数据库
class CmsOptionDao {
    //查询后台
    static async getCmsOptionContent() {
        const date = await CmsOption.findOne({});
        if (!date) {
            throw  new NotFound("无法获取cms-option数据");
        }
        return date.content;
    }

    static async setCmsOptionContent(v) {
        const date = await CmsOption.findOne({});
        if (!date) {
            throw  new NotFound("无法获取cms-option数据");
        }
        let newContent = v.get('body.content');
        date.content = newContent;
        date.save();
    }
}

module.exports = {CmsOptionDao};