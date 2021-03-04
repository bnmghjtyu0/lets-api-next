import * as React from "react";
import Head from "next/head";
import cookie from "js-cookie";

import styles from "../styles/Home.module.css";

export default function Home({ token }) {
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    (async () => {
      const res = await fetch("/api/userinfo", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "token xxx",
        },
        body: JSON.stringify({
          username: "aa",
        }),
      })
        .then((res) => res.json())
        .then((json) => json);
        if (res.retCode === 1) {
        setUserInfo(res.retVal);
      }
    })();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>登入中的使用者: {userInfo.username}</h2>

      
    </div>
  );
}

export function getServerSideProps({ req, res }) {
  let token = req.cookies?.token ?? "";
  if (!token) {
    res.statusCode = 302;
    res.setHeader("Location", `/login`);
    return { props: {} };
  }

  return { props: { token } };
}

// export async function getStaticProps(ctx) {
//   try {
//     //串接 api
//     const result = await fetch("http://localhost:3000/api").then((res) =>
//       res.json()
//     );
//     // api 回傳成功
//     return {
//       props: {
//         apiHome: result,
//       },
//     };
//   } catch (error) {
//     // 伺服器有問題
//     error.ctx = ctx;
//     // logErrorToExternalLoggingService(error, "Fetching static props failed");
//     throw error;
//   }
// }
