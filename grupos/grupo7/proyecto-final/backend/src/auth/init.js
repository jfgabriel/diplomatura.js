import passport from 'passport';
import { helpers } from '../db_helpers.js';

async function findUser(db, username, callback) {
  const user = await helpers.getDataFilterByName(db, 'usuario', username);
  if (user && username === user.username) {
    return callback(null, user);
  }
  return callback(null);
}

function initPassport(app) {
  var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwt_payload, done) {
        findUser(app.locals.db, jwt_payload.username, (err, user) => {
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
      }
    )
  );
}

module.exports = initPassport;
