const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");
const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");


class ActivityType extends Model {

}

ActivityType.init({
    name: {
      type: Sequelize.STRING(50),
      primaryKey: true,//主键
      defaultValue: "当前开启活动弹窗类型"
    },
    activity_type: {
      type: Sequelize.INTEGER,
      unique: true,
      defaultValue: 0
    },
    activity_name: {
      type: Sequelize.STRING(1000)
    }
  },
  merge(
    {
      tableName: "activity_type",
      modelName: "activity_type",
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { ActivityType };