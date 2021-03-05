import * as React from "react";
import { getUserInfo } from "../services/api";

const UserStateContext = React.createContext();
const cache = {};

async function UserProvider() {
  const [user, setUser] = React.useState();
  const [token, setToken] = React.useState();
  React.useEffect(() => {
    const storedToken = window.localStorage.getItem("token");

    setToken(storedToken);
  }, []);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    // use cached user data if we’ve already hit the API with this token
    if (cache[token]) {
      setUser(cache[token]);
      setStatus("loaded");
      return;
    }

    getUser();
  }, [token]);

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

      setUser(userWithAvatarFallback);
      cache[token] = userWithAvatarFallback;
    }
  }

  const state = {
    user,
    token,
    getUser,
  };

  return (
    <UserStateContext.Provider value={state}>
      {children}
    </UserStateContext.Provider>
  );
}

export { UserProvider };
