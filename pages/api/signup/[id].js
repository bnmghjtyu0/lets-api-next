import excuteQuery from "../db";

export async function deleteUser(id) {
  const result = await excuteQuery({
    query: `delete from users where id=${id}`,
  });
  if (result.affectedRows > 0) {
    console.log("刪除成功");
  }
}
export default async (req, res) => {
  if (req.method === "DELETE") {
    await deleteUser(req.query.id);
  }
};
