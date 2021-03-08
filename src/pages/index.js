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
