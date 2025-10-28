import { useState, useEffect } from "react";
import axios from "axios";

// axios のデフォルト設定でクッキーを送信するようにする
axios.defaults.withCredentials = true;

// バックエンドのAPIエンドポイント
// const API_URL = "http://localhost:4000";
const API_URL = "https://secret-orb-xxrx5qg9x9qhg4j-4000.app.github.dev";

/**
 * App コンポーネント
 * @returns 
 */
function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });

  /**
   * ユーザー情報を取得するメソッド
   */
  const fetchUser = async () => {
    try {
      // バックエンドの me エンドポイントにリクエストを送信
      const res = await axios.get(`${API_URL}/me`);
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * ログイン処理を行うメソッド
   */
  const login = async () => {
    try {
      // バックエンドの login エンドポイントにリクエストを送信
      // form データには username と password が含まれる
      await axios.post(`${API_URL}/login`, form);
      fetchUser();
    } catch {
      alert("ログイン失敗");
    }
  };

  /**
   * ログアウト処理を行うメソッド
   */
  const logout = async () => {
    await axios.post(`${API_URL}/logout`);
    setUser(null);
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>セッション認証デモ</h2>
      {user ? (
        <>
          <p>ようこそ、{user.username}さん！</p>
          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <>
          <input
            style={{ marginRight: 20 }}
            placeholder="username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            style={{ marginRight: 20 }}
            placeholder="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button onClick={login}>ログイン</button>
        </>
      )}
    </div>
  );
}

export default App;
