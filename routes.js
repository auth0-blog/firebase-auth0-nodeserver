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
  app.get('/auth/firebase', jwtCheck, (req, res) => {
    const uid = `${req.user.sub}`;
    firebaseAdmin.auth().createCustomToken(uid)
      .then(customToken => {
        // Response must be JSON or Firebase errors
        res.json({firebaseToken: customToken});
      })
      .catch(err => {
        res.status(500).send({
          message: 'Something went wrong acquiring a Firebase token.',
          error: err
        });
      });
  });

  // API
  const dogs = require('./dogs.json');
  const getDogsBasic = () => {
    let dogsBasicArr = [];
    dogs.forEach(dog => {
      const newDog = {
        rank: dog.rank,
        breed: dog.breed,
        image: dog.image
      };
      dogsBasicArr.push(newDog);
    });
    return dogsBasicArr;
  }
  const dogsBasic = getDogsBasic();

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

  // GET dogs (public)
  app.get('/api/dogs', (req, res) => {
    res.send(dogsBasic);
  });

  // GET dog by rank (private)
  app.get('/api/dog/:rank', jwtCheck, (req, res) => {
    const rank = req.params.rank * 1;
    const thisDog = dogs.find(dog => dog.rank === rank);
    res.send(thisDog);
  });
};
