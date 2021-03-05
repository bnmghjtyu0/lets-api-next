import * as React from "react";

const signupPage = () => {
  let formRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, nickname, password } = formRef.current.elements;
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        nickname: nickname.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((json) => json);

    console.log(res);
  };
  return (
    <div>
      <h4>註冊</h4>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label>username</label>
          <input name="username" />
        </div>
        <div>
          <label>nickname</label>
          <input name="nickname" />
        </div>
        <div>
          <label>password</label>
          <input name="password" />
        </div>

        <button type="submit">送出</button>
      </form>
    </div>
  );
};

export default signupPage;
