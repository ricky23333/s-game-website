const {HitCount} = require("../models/hit-count");
const {
    NotFound,
} = require('lin-mizar');

//DAO处理api传递过来的数据，并修改数据库
class HitcountDao {
    //查询网站点击数，并增加1
    static async getHitCount() {
        const date = await HitCount.findOne({});
        if (!date) {
            throw  new NotFound("无法获取User数据");
        }
        date.hitcount++;
        date.save();
        return date.hitcount;
    }

    //创建HitCount表中第一项
    // static async createHitCountDate() {    //
    //     const date = await HitCount.findOne({
    //     });
    //     if (date) {
    //         throw  new global.httpExceptionErrors.ForbiddenException("数据库内已存在此条目，无法创建");
    //     }
    //     const newDate = new HitCount();
    //     newDate.save();
    // }
}

module.exports = {HitcountDao};
