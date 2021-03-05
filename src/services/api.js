import React from "react";
const getUserInfo = async () => {
  let token = localStorage.getItem("token");
  const res = await fetch("/api/userinfo", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((json) => json);

  return res;
};

export { getUserInfo };
