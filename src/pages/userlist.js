import * as React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Container } from "../styled/main";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const usersPage = ({ apis }) => {
  const router = useRouter();
  const apiUserList = useSWR("/api/userlist", fetcher);

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/signup/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.data.error.message);
      }
      console.log("使用者刪除成功");
      // router.replace("/");
    } catch (error) {
      console.log("delete error", error);
    }
  }

  return (
    <Container>
      <h4>使用者列表</h4>
      {apiUserList.data?.retVal?.userlist &&
        apiUserList.data.retVal.userlist.map((list, listIdx) => {
          return (
            <li>
              {list.username}
            </li>
          );
        })}
    </Container>
  );
};

export default usersPage;

export function getServerSideProps({ req, res }) {
  let token = req.cookies?.token ?? "";
  if (!token) {
    res.statusCode = 302;
    res.setHeader("Location", `/login`);
    return { props: {} };
  }

  return { props: { token } };
}
