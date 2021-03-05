import * as React from "react";
import { useRouter } from "next/router";
import { Container } from "../styled/main";

const LoginPage = () => {
  let router = useRouter();
  let formRef = React.useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = formRef.current.elements;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => json);
    if (res.retCode === 1) {
      console.log("登入成功");
      console.log(res);
      localStorage.setItem("token", res.retVal.token);
      router.replace("/");
    }
  }
  return (
    <Container>
      <h4>登入</h4>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="flex">
          <label>username</label>
          <input name="username" />
        </div>
        <div>
          <label>password</label>
          <input name="password" />
        </div>

        <input type="submit" />
      </form>
    </Container>
  );
};

export default LoginPage;
