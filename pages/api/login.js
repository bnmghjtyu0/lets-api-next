// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// 所有 api 需要取得 api 才能使用

// [POST] login
// accout xxx
// password xxx

// response
// [{retCode:1, retVal: 'xxxsidxxx',retMsg:'api登入完成'}]

export default (req, res) => {
  res.status(200).json({ name: "John Doe" });
};
