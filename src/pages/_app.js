import React from "react";
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
  React.useEffect(() => {
    (async () => {
      let res = await getUserInfo();
      if (res.retCode === 1) {
        console.log(res);
      }
    })();
  }, []);

  async function getUser() {
    // TODO add SWR
    let res = await getUserInfo();
    if (res.retCode === 1) {
      const userWithAvatarFallback = {
        ...res,
        avatar_url:
          res.avatar_url ??
          "https://res.cloudinary.com/netlify/image/upload/q_auto,f_auto,w_210/v1605632851/explorers/avatar.jpg",
      };

      setUser(res.retVal);
      // cache[token] = userWithAvatarFallback;
    }
  }

  return (
    <div>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
      </UserProvider>
    </div>
  );
}

export default MyApp;
