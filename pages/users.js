import * as React from "react";
import { useRouter } from "next/router";

const usersPage = ({ apis }) => {
  const router = useRouter();
  
  async function handleDeleteButtonClick(id) {
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
    <div>
      <h4>使用者列表</h4>
      {apis.retMsg.users.length === 0 ? (
        <div>沒有資料</div>
      ) : (
        <ul>
          {apis.retMsg.users.map((user, userIdx) => {
            return (
              <li>
                {user.email}
                <button
                  onClick={() => handleDeleteButtonClick(user.id)}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block flex-grow mt-2 md:inline md:flex-grow-0 md:m-0 md:ml-1"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default usersPage;

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:3000/api/users");
  const posts = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      apis: {
        retCode: 1,
        retMsg: {
          users: posts.users,
        },
      },
    },
  };
}
