import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home({ apis }) {
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
      console.log('使用者刪除成功')
      router.replace("/");
    } catch (error) {
      console.log("delete error", error);
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h4>註冊</h4>
      <form method="POST" action="/api/signup">
        <div className="flex">
          <label>email</label>
          <input name="email" />
        </div>
        <div>
          <label>password</label>
          <input name="password" />
        </div>

        <input type="submit" />
      </form>

      <h4>使用者列表</h4>
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
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:3000/api/hello");
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