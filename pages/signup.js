import * as React from "react";
import { useRouter } from "next/router";

const signupPage = () => {
  let formRef = React.useRef();
  let router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formRef.current.elements;
    const res = await fetch("/api/signup", {
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
      // router.replace("/");
    }
  }
  return (
    <div>
      <h4>註冊</h4>
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

export default signupPage;
