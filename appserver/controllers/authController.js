var bodyParser = require('body-parser');
var config = require('../config');
const axios = require('axios');
var bodyParser = require('body-parser');

function authAPI(app) {
  var firebaseAuthKey = config.getAuthKey();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

    // Allow Sign Up only for 10 Users (homeController)
    app.post('/api/auth/signup', function(req, res) {
        console.log("In Signup " + firebaseAuthKey);
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ firebaseAuthKey,
        {
          email: req.body.email,
          password: req.body.password,
          returnSecureToken: true
        })
        .then(response => {
          console.log(response.data);
          res.send(response.data);
        })
        .catch(error => {
          //console.log(error);
          console.log(error.response.data);
          res.status(500).send(error.response.data);
        });
    });


}

module.exports = function(app) {
  authAPI(app);
}
