# docbase-post-filter

## これは何？

DocBase の WebHook を Slack の Incoming WebHook に中継するWebアプリケーションです。
ただし、タグに `secret`, `confidential`, `秘密` が含まれている場合、メモの内容自体はSlackに投稿されません。

メモの登録と更新のみに対応しています。

`secret`タグを含まないメモ（投稿にメモの内容が含まれる）

![](https://gyazo.com/5e42b281a325986594967813143465a4.png)

`secret`タグを含むメモ（投稿にメモの内容が含まれない）

![](https://gyazo.com/723cae0783c91671212c5ac9b0fc812e.png)



## 使い方

このアプリが動作するためには環境変数 `SLACK_WEBHOOK_URL` にSlackのIncoming WebHook のURLを設定しておく必要がある。　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　

hereoku へデプロイする場合の例

```
$ heroku config:set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxxxxxx/zzzzzzzzzzzzzzzz
```


