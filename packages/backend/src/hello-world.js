const express = require("express");
const app = express();
const port = 3000;

// ルート設定
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// サーバー起動
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
