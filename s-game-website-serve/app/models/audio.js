const { Sequelize, Model } = require("sequelize");
const { db } = require("lin-mizar/lin/db");
const { InfoCrudMixin } = require("lin-mizar/lin/interface");
const { merge } = require("lodash");

//管理user数据表的格式
class Audio extends Model {

}

Audio.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,//主键
      autoIncrement: true//自增长
    },
    audio_name: Sequelize.STRING(100),
    audio_url: Sequelize.STRING(500),
    cover_url: Sequelize.STRING(500),
  },
  merge(
    {
      tableName: "audio",
      modelName: "audio",
      sequelize: db
    },
    InfoCrudMixin.options
  )
);

module.exports = { Audio };