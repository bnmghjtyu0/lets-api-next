import excuteQuery from "./db";

export default async (req, res) => {
  console.log(req.method)
  if (req.method === "GET") {
    const result = await excuteQuery({
      query: "select * from users",
    });
    res.status(200).json({ users: result });
  }

  return res.status(405).json({ msg: "Method not implemented" });
};
