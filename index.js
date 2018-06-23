const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const slack_webhook_url = process.env.SLACK_WEBHOOK_URL;
console.debug('slack_webhook_url: ', slack_webhook_url);

if (!slack_webhook_url) {
  console.error('SLACK_WEBHOOK_URL is not defined.')
  process.exit(1);
}

const docbase_team = process.env.DOCBASE_TEAM;
console.debug('docbase_team: ', docbase_team);

if (!docbase_team) {
  console.error('DOCBASE_TEAM is not defined.');
  process.exit(1);
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.debug('body: ', req.body);

  let action = req.body.action;

  if (action !== 'post_publish' && action !== 'post_update') {
    console.debug('action is not supported: ', action);
    res.status(200).end();
    return;
  }

  let slack_json = createSlackJson(req.body, action);
  console.debug('slack_json: ', slack_json);

  postToSlack(slack_json);

  res.status(200).end();
});

app.listen(process.env.PORT || 8080);

function createSlackJson(docbase, action) {
  let json = {
    user_name: 'DocBase',
    icon_url: 'https://docbase.io/logo.png',
  };

  let sender_name = docbase.sender.name;
  let sender_id = docbase.sender.id;
  let sender_url = `https://${docbase_team}.docbase.io/users/${sender_id}`;

  let post_title = docbase.post.title;
  let post_url = docbase.post.url;

  switch (action) {
    case 'post_publish':
      json['text'] = `<${sender_url}|${sender_name}>さんが「<${post_url}|${post_title}>」を公開しました`;
      break;

    case 'post_update':
      json['text'] = `<${sender_url}|${sender_name}>さんが「<${post_url}|${post_title}>」を更新しました`;
      break;
  }

  json['attachments'] = [{
    color: '#2095C6',
    text: extractMessageText(docbase.message),
  }];

  return json;
}

function extractMessageText(message) {
  let pattern = /(^[^\n]+\n)([^\n]+\n)([\s\S]+$)/;
  let match = message.match(pattern);

  if (!match) {
    console.debug('Extract message was failed.')
    return '';
  }

  return match[3];
}

function postToSlack(json) {
  request({
    uri: slack_webhook_url,
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      payload: JSON.stringify(json)
    }
  });
}
