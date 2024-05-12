# spotify-ranking

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

`curl -H "Content-Type: application/x-www-form-urlencoded" -X POST "https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=hogefuga1353&client_id=CLIENT_ID&client_secret=CLIENT_SECRET"`

Access Tokenを使って必要なデータを取得できる。

```shell
curl --request GET \
  --url 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10&offset=1' \
  --header 'Authorization: Bearer hogefuga1234'`
```

### エンドポイントについて

Spotify Web APIには以下の二つのエンドポイントが存在している。

- https://accounts.spotify.com：
    - Spotifyアカウント(ユーザ認可)へのAPI用
- https://api.spotify.com/：
    - それ以外(アーティスト・プレイリスト・トラックなど)のSpotifyサービスへのAPI用