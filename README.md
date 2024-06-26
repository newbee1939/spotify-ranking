# spotify-ranking

## setup

バージョン確認。

```shell
npm bun --version
```

## Technical Memo

### トークン（Token）について

Spotify APIには以下の二つのトークンがある。

- Access Token
- Refresh Token

Access Tokenは期限が1時間であり、APIにアクセスするために必要である。

### Refresh Tokenの取得方法

ブラウザから認可リクエストを送る。

`https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost&scope=user-top-read&state=state`

以下のように`code`を含むレスポンスが返ってくる。

`http://localhost/?code=hogefguga1234`

このcodeを使ってRefresh Tokenを取得する。

`curl -H "Content-Type: application/x-www-form-urlencoded" -X POST "https://accounts.spotify.com/api/token?grant_type=authorization_code&code=hogefguga1234&redirect_uri=http://localhost&client_id=CLIENT_ID&client_secret=CLIENT_SECRET"`

Refresh TokenからAccess Tokenを取得する。
※初回にRefresh Tokenを取得して以降はここの手順からで問題ない

`curl -H "Content-Type: application/x-www-form-urlencoded" -X POST "https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=REFRESH_TOKEN&client_id=CLIENT_ID&client_secret=CLIENT_SECRET"`

Access Tokenを使って必要なデータを取得できる。

```shell
curl --request GET \
  --url 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50' \
  -H 'Authorization: Bearer ACCESS_TOKEN' \
  -H 'Accept-Language: ja'
```

### エンドポイントについて

Spotify Web APIには以下の二つのエンドポイントが存在している。

- https://accounts.spotify.com：
    - Spotifyアカウント(ユーザ認可)へのAPI用
- https://api.spotify.com/：
    - それ以外(アーティスト・プレイリスト・トラックなど)のSpotifyサービスへのAPI用

## 参考資料

- [Spotify APIで自分のお気に入り曲を自動で取得・表示してみた](https://zenn.dev/noriyu/articles/484570e025c8f9)
- [SpotifyWebAPIの認可フローをまとめてみた](https://kin29.info/spotifywebapi%E3%81%AE%E8%AA%8D%E5%8F%AF%E3%83%95%E3%83%AD%E3%83%BC%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%81%BF%E3%81%9F/)
- [Get User's Top Items](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks)
- [Remove Playlist Items](https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist)
- [Create Playlist](https://developer.spotify.com/documentation/web-api/reference/create-playlist)
- [Add Items to Playlist](https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist)
- [Spotify APIで自分専用の再生数ランキングを作る](https://blog.yuu26.com/spotify-api/)
