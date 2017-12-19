import * as express from 'express';
import * as mysql from 'mysql';
import * as fs from 'fs';
import * as url from 'url';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as proxy from 'express-http-proxy';

import bindApiCalls from './bind-api-calls';

const {
  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DB,
  PORT,
  IS_DEV
} = JSON.parse(fs.readFileSync('.apiConfig', 'utf8'));

const app = express();

if (IS_DEV) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://dev.casefind.org');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
  });
}

const db = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB
});

app.use(morgan('dev'))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

bindApiCalls(IS_DEV, app, db);

if (!IS_DEV || process.argv[2] === 'prod') {
  const reactRouterRoutes = [
    '/',
    '/contact',
    '/search',
    '/search/*',
    '/case/*'
  ];
  reactRouterRoutes.forEach((r) => {
    app.get(r, (req, res, next) => res.sendFile(path.resolve(__dirname, '../../client/build/index.html')));
  });

  app.get('*', express.static(path.resolve(__dirname, '../../client/build')));
}

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`Listening on ${PORT}`);
      }
    });
  }
});
