const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.debug('body: %s', req.body);

  let action = req.body.action;

  if (action !== 'post_publish' && action !== 'post_update') {
    console.debug('Unsupported action: %s', action);
    res.status(200).end();
  }

  res.status(200).end();
});

app.listen(process.env.PORT || 8080);
