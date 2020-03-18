const bcrypt = require("bcryptjs");
const moment = require("moment");
const {Sequelize, Model} = require("sequelize");
const {sequelize} = require("./../datebase");

//管理admin数据表的格式
class Admin extends Model {

}

Admin.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,//主键
        autoIncrement: true,//自增长
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            //密码加密
            const salt = bcrypt.genSaltSync(10);
            const codePwd = bcrypt.hashSync(val, salt);
            this.setDataValue("password", codePwd);
        }
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize, tableName: 'admin'
});

module.exports = {Admin};