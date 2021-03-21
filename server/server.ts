import * as express from 'express';
import {Application} from 'express';
import * as fs from 'fs';
import * as https from 'https';
import {retrieveUserIdFromRequest} from './middleware/get-user.middleware';
import {readAllLessons} from './routes/read-all-lessons.route';
import {checkIfAuthenticated} from './middleware/authentication.middleware';
import {createUser} from './routes/create-user.route';
import {getUser} from './routes/get-user.route';
import {checkCsrfToken} from './middleware/csrf.middleware';
import {logout} from './routes/logout.route';
import {login} from './routes/login.route';
import {AddressInfo} from 'net';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app: Application = express();

app.use(cookieParser());
app.use(retrieveUserIdFromRequest);
app.use(bodyParser.json());

const commandLineArgs = require('command-line-args');
const optionDefinitions = [
  { name: 'secure', type: Boolean,  defaultOption: true },
];
const options = commandLineArgs(optionDefinitions);

// REST API
app.route('/api/lessons')
  .get(checkIfAuthenticated, readAllLessons);

app.route('/api/signup')
  .post(createUser);

app.route('/api/user')
  .get(getUser);

app.route('/api/logout')
  .post(checkIfAuthenticated, checkCsrfToken, logout);

app.route('/api/login')
  .post(login);

if (options.secure) {
  const httpsServer = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, app);
    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
  httpsServer.listen(9000, () =>
      console.log('HTTPS Secure Server running at https://localhost:' + (httpsServer.address() as AddressInfo).port));
} else {

  // launch an HTTP Server
  const httpServer = app.listen(9000, () => {
      console.log('HTTP Server running at https://localhost:' + (httpServer.address() as AddressInfo).port);
  });
}








