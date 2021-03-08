import { rest } from "msw";
export const handlers = [
  rest.post("/api/login", (req, res, ctx) => {
    // sessionStorage.setItem("is-authenticated", true);
    return res(
      ctx.cookie("token", "richardissuperior"),
      ctx.status(200),
      ctx.json({
        retCode: 1,
        retMsg: "登入成功",
        retVal: {
          token: "richardissuperior",
        },
      })
    );
  }),
  rest.post("/api/userinfo", (req, res, ctx) => {
    // const isAuthenticated = sessionStorage.getItem("is-authenticated");
    const { token } = req.cookies;
    if (!token) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        retCode: 1,
        retMsg: "登入成功",
        retVal: {
          username: "richard",
        },
      })
    );
  }),
  rest.post("/api/logout", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        retCode: 1,
        retMsg: "登入成功",
        retVal: {
          username: "richard",
        },
      })
    );
  }),

  rest.get("/api/userlist", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        retCode: 1,
        retMsg: "登入成功",
        retVal: { userlist: [{ username: "richard" }] },
      })
    );
  }),
];
