const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 4000;

// CORSの設定（Reactアプリからのアクセスを許可）
app.use(
  cors({
    origin: "http://localhost:5173", // React側のURL
    credentials: true,
  })
);

// JSONパースの設定
app.use(express.json());

// セッションの設定(Express.js用のミドルウェアを割り当てる)
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false,
    },
    genid: function (req) {
      return "user-1234";
    },
  })
);

// ユーザー認証(モックデータ)
const USER = {
  username: "user1",
  password: "pass1",
};

// ログイン処理
app.post("/login", (req, res) => {
  // リクエストボディからユーザー情報を取得
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    // セッションにユーザー情報を保存
    req.session.user = { username };
    return res.json({ message: "ログイン成功" });
  }
  res.status(401).json({ message: "認証失敗" });
});

// 認証チェック
app.get("/me", (req, res) => {
  // セッション情報があればログイン済みとみなし、セッション内に格納されているユーザー情報を返す
  if (req.session.user) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  res.status(401).json({ loggedIn: false });
});

// ログアウトの処理
app.post("/logout", (req, res) => {
  // セッションを破棄する
  req.session.destroy(() => {
    res.json({ message: "ログアウトしました" });
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
