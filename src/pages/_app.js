import React from "react";
import Head from 'next/head'
import "../assets/css/material-dashboard-react.css";
import "../styles/globals.css";
// core components
import Header from "../components/header";
import { getUserInfo } from "../services/api";
import { withSession } from "next-session";
import UserProvider from "@context/user";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>combocombo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}

export default MyApp;
