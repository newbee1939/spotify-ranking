import axios, { type AxiosRequestConfig } from "axios";

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
const getSongsConfig: AxiosRequestConfig = {
  method: 'get',
  url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50',
  headers: { 
    'Authorization': `Bearer ${accessToken}`, 
    'Accept-Language': 'ja'
  }
};

const songItems = (await axios(getSongsConfig)).data.items;

console.log(songItems);

// プレイリストに曲を追加する（すでに登録されている場合はスキップされる？）
const songData = {
  // 追加する曲のURLリスト
  uris: [
    "string"
  ],
  position: 0
};

const config: AxiosRequestConfig = {
  method: 'post',
  url: 'https://api.spotify.com/v1/playlists/SgLzgRzpShKhGTFTRiH1Vw/tracks',
  headers: { 
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  data: songData
};

// axios(config)
//   .then(response => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(error => {
//     console.error(error);
//   });
