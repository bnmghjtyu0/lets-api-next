import bcrypt from "bcrypt";
import excuteQuery from "../db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    createUser({ email, password }, req, res);
  }
}

export async function createUser({ email, password }, req, res) {
  let user = {
    email,
  };

  let saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    const result = await excuteQuery({
      query: "INSERT INTO users (email, password) VALUES(?, ?)",
      values: [user.email, hash],
    });

    if (result.affectedRows === 1) {
      res.redirect("/");
    }
  });

  return user;
}
