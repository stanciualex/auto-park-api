const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(cors({exposedHeaders: ['Location']}));

app.use('', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
