// Dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const firebaseAdmin = require('firebase-admin');

module.exports = function(app, config) {
  // Auth0 athentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Initialize Firebase Admin
  const serviceAccount = require(config.FIREBASE_KEY);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: config.FIREBASE_DB
  });

  // GET Firebase token
  app.get('/delegate/firebase', jwtCheck, (req, res) => {
    const uid = `${req.user.sub}`;
    firebaseAdmin.auth().createCustomToken(uid)
      .then(customToken => {
        // Response must be JSON or Firebase errors
        res.json({firebaseToken: customToken});
      })
      .catch(err => res.status(500).send('Something went wrong acquiring a Firebase token.'));
  });

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

};
