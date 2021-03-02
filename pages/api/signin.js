import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");
import excuteQuery from "./db";

const KEY = process.env.JWT_KEY;

export default function signinHandler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    // console.log(req.body.email); 前端必須要送 header 不然會回傳 undefined

    findUser({ email, password }, req, res);
    // res.redirect("/");
  }
  // return res.status(405).json({ msg: "Method not implemented" });
}

async function findUser(users, req, res) {
  const { email, password } = users;
  console.log(users);
  const result = await excuteQuery({
    query: "select * from users where email = ?",
    values: [email],
  });
  console.log(result);
  if (result.length === 0) {
    res.status(200).json({
      retCode: 0,
      retMsg: "查無此帳號",
    });
  }

  if (result.length !== 0) {
    bcrypt.compare(password, result[0].password, (err, result) => {
      if (result) {
        console.log("登入成功");
        /* Sign token */
        jwt.sign(
          { foo: "bar" },
          KEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (_err, token) => {
            /* Send succes with token */
            res.status(200).json({
              retCode: 1,
              retMsg: "登入成功",
              retVal: {
                token: "Bearer " + token,
              },
            });
          }
        );
      }
    });
  }
}
