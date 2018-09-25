const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8585;
const buildPath = path.join(__dirname, 'build');

app.set('port', port);

app.use(express.static(buildPath, { maxAge: '90d' }));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is listening at ${port} port`);
});
