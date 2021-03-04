import * as React from "react";
import Head from "next/head";
import cookie from "js-cookie";
import styles from "../styles/Home.module.css";

export default function Home({ token }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>token: {token}</h2>
    </div>
  );
}

export function getServerSideProps({ req, res }) {
  let token = req.cookies?.token ?? "";
  if (!token) {
    res.statusCode = 302;
    res.setHeader("Location", `/signin`);
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
