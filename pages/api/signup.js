import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import excuteQuery from "./db";

export default function handler(req, res) {
  console.log(123123);
  if (req.method === "POST") {
    const { email, password } = req.body;
    createUser({ email, password });
    res.redirect("/");
  }
}

export async function createUser({ email, password }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  const user = {
    email,
    hash,
    salt,
  };

  try {
    const result = await excuteQuery({
      query: "INSERT INTO users (email, password) VALUES(?, ?)",
      values: [user.email, user.hash],
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  return user;
}
