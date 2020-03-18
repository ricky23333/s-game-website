const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");
const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");

class Main_Type extends Model {

}

Main_Type.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,//主键
      autoIncrement: true//自增长
    },
    tab_name: Sequelize.STRING(50),//该类显示的名称
    router_name: Sequelize.STRING(50),//大类路由
    child_types: Sequelize.STRING(1000),//子类，多个用*分割   子一级用|分割  名字和路由用&分割
    carousel_types: Sequelize.STRING(1000)//轮播图子类，多个用*分割   子一级用|分割  名字和路由用&分割
  },
  merge(
    {
      tableName: "main_type",
      modelName: "main_type",
      sequelize: db,
    },
    InfoCrudMixin.options
  )
);

module.exports = { Main_Type };