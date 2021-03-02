const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

let database = "richard";
let username = "richard";
let password = "root";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

const User = sequelize.define("user1", {
  // Model attributes are defined here
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Comment = sequelize.define("comment1", {
  content: {
    type: Sequelize.STRING,
  },
});

// 建立關聯
// 關連到其他欄位的名字叫 foreign key
User.hasMany(Comment); //必須在 Comment 資料表中加入 user1Id，才能成功關聯
Comment.belongsTo(User);

const mockRegister = (account, password) => {
  let saltRounds = 10;
  let inputAccount = account;
  let inputPassword = password;
  bcrypt.hash(inputPassword, saltRounds, (err, hash) => {
    User.create({
      username: inputAccount,
      nickname: inputAccount,
      password: hash,
    }).then(() => {
      console.log("created!");
    });
  });
};

const mockLogin = (account, password) => {
  User.findOne({
    where: {
      username: account,
    },
  }).then((user) => {
    if (!user) {
      console.log("error", user);
      return next();
    }
    console.log(JSON.stringify(user, null, 4));
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        console.log("登入成功");
        Comment.create({
          user1Id: user.id, //資料表名稱+Id
          content: "Hello 02",
        }).then(() => {
          console.log("新增成功");
        });
      }
    });
    return { user };
  });
};
sequelize.sync().then(() => {
  mockRegister("aa", "aa");
  mockLogin("aa", "aa");

  // User 資料表中取得 Comment
  User.findAll({
    include: Comment,
    where: {
      username: "aa",
    },
  }).then((user) => {
    // console.log(JSON.stringify(user, null, 4));
  }); // Comment 資料表中取得 User

  Comment.findAll({
    include: User,
    where: {
      content: "Hello 01",
    },
  }).then((content) => {
    // console.log(JSON.stringify(content, null, 4));
  });
});
