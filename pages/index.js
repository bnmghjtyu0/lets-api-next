import * as React from "react";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home({ apiHome }) {
  if (apiHome.retCode === 0) return <div />;
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {apiHome.retVal.title}
    </div>
  );
}

export async function getStaticProps(ctx) {
  try {
    //串接 api
    const result = await fetch("http://localhost:3001/api").then((res) =>
      res.json()
    );
    // api 回傳成功
    return {
      props: {
        apiHome: result,
      },
    };
  } catch (error) {
    // 伺服器有問題
    error.ctx = ctx;
    // logErrorToExternalLoggingService(error, "Fetching static props failed");
    throw error;
  }
}
