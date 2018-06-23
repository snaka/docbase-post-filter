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

あらかじめ Slack で Incoming WebHook の設定を行い URL を取得しておく。

その後、以下のボタンを押して heroku にWebアプリケーションをデプロイする。（デプロイ時に WebHook のURLを聞かれるので先に取得しておいた Slack の WebHook の URL を設定する）

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

あるいは、以下のように手動でデプロイ（`SLACK_WEBHOOK_URL` にはあらかじめ取得しておいたSlackの WebHook URL を設定する）

```
$ heroku create
$ heroku config:set SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxxxxxxxxxxxxxx
$ git push heroku master
```
