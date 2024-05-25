import axios from "axios";

// アクセストークンの取得
const REFRESH_TOKEN = Bun.env.REFRESH_TOKEN;
const CLIENT_ID = Bun.env.CLIENT_ID;
const CLIENT_SECRET = Bun.env.CLIENT_SECRET;

const postData = new URLSearchParams();
postData.append('grant_type', 'refresh_token');
postData.append('refresh_token', REFRESH_TOKEN || "");
postData.append('client_id', CLIENT_ID || "");
postData.append('client_secret', CLIENT_SECRET || "");

const accessToken = (await axios.post('https://accounts.spotify.com/api/token', postData, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})).data.access_token;

// My Top Songsを取得する
// 以下もaxiosを用いたリクエストに変換して

// curl --request GET \
//   --url 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50' \
//   -H 'Authorization: Bearer ACCESS_TOKEN' \
//   -H 'Accept-Language: ja'

// プレイリストに曲を追加する（すでに登録されている場合はスキップされる？）
