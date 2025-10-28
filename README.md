# SessionSampleApp
React + Express.js で作成するセッション認証学習用のリポジトリ

## 動かし方

### インストール

```bash
pnpm i
```

### フロントエンドのビルドと起動

```Bash
pnpm frontend build
```

```bash
pnpm frontend dev
```

### バックエンドの起動

```bash
pnpm backend dev
```

## セッションハイジャックの実演(学習目的)

ブラウザの「検証ツール」>「Application」＞「Storage」＞「Cookies」から connect.sid の値をコピーする

そして以下のようなcurlコマンドを実行する

```bash
curl -H "Cookie: connect.sid=<ここにsidの値をコピペする>" http://localhost:4000/me
```

以下のようにユーザー情報を返ってくればOK!

```json
{
    "loggedIn":true,
    "user":{
        "username":"user1"
    }
}
```

## セッションハイジャックの対策方針

- ログイン成功時にセッションIDを再生成するように実装する
    - 事前に盗まれたセッションIDを無効化するため



## 参考文献
- [セッション認証とは？React × Expressでハンズオンしながら学ぶ](https://qiita.com/t_maki/items/c70148bf2f66415ddb91)
- [セッション認証とトークン認証について](https://zenn.dev/oreilly_ota/articles/31d66fab5c184e)
- [セッションベース認証とトークンベース認証の違いを分かりやすくまとめてみる](https://zenn.dev/tanaka_takeru/articles/3fe82159a045f7)