import passport from 'passport';
import UserModel from '../models/usuario';

async function findUser(username, callback) {
  const user = await UserModel.findOne({ username });
  if (user && username === user.username) {
    return callback(null, user);
  }
  return callback(null);
}

function initPassport(app) {
  var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      findUser(jwt_payload.username, (err, user) => {
        if (err) {
          return done(err);
        } else if (jwt_payload.expire <= Date.now()) {
          return done('Token Expired', null);
        }
        // User not found
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
}

module.exports = initPassport;
