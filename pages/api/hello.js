import excuteQuery from "./db";

export default async (req, res) => {
  const result = await excuteQuery({
    query: "select * from users",
  });
  res.status(200).json({ users: result });
};
