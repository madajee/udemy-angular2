module.exports = {

  getAuthKey: function() {
       /*return 'mongodb+srv://' + configValues.uname + ':' + configValues.pwd +
      '@' + configValues.dburl;*/
      //return configValues.DATABASE_URL_PAAS;
      return process.env.FIREBASE_AUTH_KEY;
  }
}
