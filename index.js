const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8585;
const publicPath = path.join(__dirname, 'build');

app.set('port', port);

app.use(express.static(publicPath, { maxAge: '90d' }));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening at ${port} port`);
});
