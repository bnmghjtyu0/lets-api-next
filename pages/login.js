import * as React from "react";
import { useRouter } from "next/router";
const LoginPage = () => {
  let router = useRouter();
  let formRef = React.useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formRef.current.elements;
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
      .then((res) => res.json())
      .then((json) => json);
    if (res.retCode === 1) {
      console.log(res.retVal.token);
      router.replace("/");
    }
  }
  return (
    <div>
      <h4>登入</h4>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="flex">
          <label>email</label>
          <input name="email" />
        </div>
        <div>
          <label>password</label>
          <input name="password" />
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
