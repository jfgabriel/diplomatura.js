function authenticationMiddleware() {
  return function (req, res, next) {
    console.log(req.user);
    //if (req.isAuthenticated()) {
    if (typeof req.user != 'undefined' && typeof req.user.name != 'undefined') {
      return next();
    }
    res.redirect('/');
  };
}

module.exports = authenticationMiddleware;
