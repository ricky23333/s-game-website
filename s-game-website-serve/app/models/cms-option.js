const {Sequelize, Model} = require("sequelize");
const {db} = require("lin-mizar/lin/db");
const {InfoCrudMixin} = require('lin-mizar/lin/interface');
const {merge} = require('lodash');

//管理user数据表的格式
class CmsOption extends Model {

}

CmsOption.init({
        name: {
            type: Sequelize.STRING(50),
            primaryKey: true,//主键
            defaultValue: "后台管理系统部分设置",
        },
        content: Sequelize.TEXT('long'),//文章长文本
    },
    merge(
        {
            tableName: 'cms_option',
            modelName: 'cms_option',
            sequelize: db,
        },
        InfoCrudMixin.options
    )
);

module.exports = {CmsOption};