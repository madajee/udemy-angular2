var bodyParser = require('body-parser');
var config = require('../config');
const axios = require('axios');

function authAPI(app) {
  var firebaseAuthKey = config.getAuthKey();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

    // Allow Sign Up only for 10 Users (homeController)
    app.get('/api/auth/signup', function(req, res) {
        console.log("In Signup " + firebaseAuthKey);
        axios.get("https://ng-course-recipe-book-54871.firebaseio.com/recipes.json")
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    });


}

module.exports = function(app) {
  authAPI(app);
}
