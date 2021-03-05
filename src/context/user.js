import React, { createContext, useState } from "react";
import { getUserInfo } from "../services/api";
export const UserContext = createContext();
const cache = {};

const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState();

  React.useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  React.useEffect(() => {
    if (!token) {
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
      setUser(res.retVal);
      // cache[token] = userWithAvatarFallback;
    }
  }

  const defaultValue = {
    state: { user },
    getUser,
  };
  return (
    <UserContext.Provider value={defaultValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
