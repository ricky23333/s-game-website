require("./initial");
const { db } = require("lin-mizar/lin/db");
const { User, UserAdmin } = require("lin-mizar/lin");
const { UserInterface } = require("lin-mizar/lin/interface");
const lodash = require("lodash");

const run = async () => {
  await User.init(
    { ...UserInterface.attributes },
    lodash.merge(
      {
        sequelize: db,
        tableName: "lin_user",
        modelName: "lin_user"
      },
      UserInterface.options
    )
  );
  // 创建super
  try {
    await User.create({
      username: "super",
      admin: UserAdmin.ADMIN,
      password: "super"
    });
  } catch (error) {
    console.log(error);
  }
  console.log("创建管理员帐号，账号：super 密码:super");
  db.close();
};

run();
