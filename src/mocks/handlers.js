import { rest } from "msw";
export const handlers = [
  rest.post("/api/login", (req, res, ctx) => {
    return res(
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
];
