const {ActivityType} = require("../models/activity-type");
const {
    NotFound,
} = require('lin-mizar');

//DAO处理api传递过来的数据，并修改数据库
class ActivityTypeDao {
    //查询后台
    async getActivityType() {
        const date = await ActivityType.findOne({});
        if (!date) {
            throw  new NotFound("无法获取ActivityType数据");
        }
        let temp = {
            activity_type: date.activity_type,
            activity_name: date.activity_name,
        };
        return temp;
    }

    async setActivityType(v) {
        const date = await ActivityType.findOne({});
        if (!date) {
            throw  new NotFound("无法获取ActivityType数据");
        }
        let newType = v.get('body.activity_type');
        date.activity_type = newType;
        date.save();
    }
}

module.exports = {ActivityTypeDao};