const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");
const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");

//管理user数据表的格式
class HitCount extends Model {

}

HitCount.init({
    name: {
      type: Sequelize.STRING(50),
      primaryKey: true,//主键
      defaultValue: "网站点击数"
    },
    hitcount: {
      type: Sequelize.INTEGER,
      unique: true,
      defaultValue: 0
    }
  },
  merge(
    {
      tableName: "hit_count",
      modelName: "hit_count",
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { HitCount };