import * as express from 'express';
import {Application} from 'express';
import * as fs from 'fs';
import * as https from 'https';
import {readAllLessons} from './routes/read-all-lessons.route';
import {AddressInfo} from 'net';
import {userInfo} from './routes/user-info.route';

const bodyParser = require('body-parser');
const commandLineArgs = require('command-line-args');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app: Application = express();

app.use(bodyParser.json());

const optionDefinitions = [
    { name: 'secure', type: Boolean, defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);
const checkIfAuthenticated = jwt({
  algorithms: ['RS256'],
  secret: jwksRsa.expressJwtSecret({
    jwksUri: 'https://dev-jl5qaipz.eu.auth0.com/.well-known/jwks.json',
    cache: true,
    rateLimit: true
  })
});

app.use(checkIfAuthenticated);
app.use((err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    res.status(err.status).json({ message: err.message });
  } else {
    next();
  }
});

// REST API
app.route('/api/lessons').get(readAllLessons);
app.route('/api/userinfo').put(userInfo);


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








