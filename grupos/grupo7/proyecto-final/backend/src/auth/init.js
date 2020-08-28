import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { helpers } from '../db_helpers.js';
import { connect } from '../connection';

import authenticationMiddleware from './middleware';

async function findUser(username, callback) {
  const db = await connect();
  const user = await helpers.getDataFilterByName(db, 'usuario', username);

  if (user && username === user.username) {
    return callback(null, user);
  }
  return callback(null);
}

function validPassword(userpass, loginpass) {
  bcrypt.compare(loginpass, userpass, (err, isValid) => {
    return isValid;
  });
}

passport.serializeUser((user, cb) => {
  const sessionUser = {
    id: user.id,
    name: user.username,
  };
  cb(null, sessionUser);
});

passport.deserializeUser((sessionUser, cb) => {
  cb(null, sessionUser);
});

function initPassport() {
  passport.use(
    new LocalStrategy((username, password, done) => {
      findUser(username, (err, user) => {
        if (err) {
          return done(err);
        }

        // User not found
        if (!user) {
          return done(null, false);
        }

        bcrypt.compare(password, user.password, (err, isValid) => {
          if (isValid) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    })
  );

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;
