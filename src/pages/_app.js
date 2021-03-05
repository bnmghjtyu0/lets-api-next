import React from "react";
import "../assets/css/material-dashboard-react.css";
import "../styles/globals.css";
// core components
import Header from "../components/header";
import { getUserInfo } from "../services/api";
import { withSession } from "next-session";
import { UserProvider } from "@context/user";
function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    (async () => {
      let res = await getUserInfo();
      if (res.retCode === 1) {
        console.log(res);
      }
    })();
  }, []);

  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
