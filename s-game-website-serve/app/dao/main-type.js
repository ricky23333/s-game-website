const {Main_Type} = require("../models/main-type");
const {ActivityType} = require("../models/activity-type");
const {
    NotFound,
} = require('lin-mizar');

//DAO处理api传递过来的数据，并修改数据库
class MainTypeDao {
    static async getMainType() {
        const date = await Main_Type.findAll({});
        if (!date) {
            throw  new NotFound("无法获取MainType数据");
        }

        const tempDateAry = [];

        date.forEach((item) => {
            let tempDate = {
                id: item.id,
                tab_name: item.tab_name,
                router_name: item.router_name,
                child_types: item.child_types,
                carousel_types: item.carousel_types,
            };
            tempDateAry.push(tempDate);
        });
        return tempDateAry;
    }

    static async getActivityType() {
        const date = await ActivityType.findOne({});
        if (!date) {
            throw  new NotFound("无法获取ActivityType数据");
        }
        return date.activity_type;
    }
}

module.exports = {MainTypeDao};
