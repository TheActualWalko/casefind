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
import sendIndex from './send-index';

const {
  MYSQL_HOST, 
  MYSQL_USERNAME, 
  MYSQL_PASSWORD, 
  MYSQL_DB, 
  PORT,
  IS_DEV
} = JSON.parse(fs.readFileSync('.apiConfig', 'utf8'));

const app = express();
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

app.get('/', sendIndex(IS_DEV, db));
if (process.argv[2] === 'dev') {
  app.get('*', proxy('localhost:3002'));
} else {
  app.use(express.static('../public'));
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
