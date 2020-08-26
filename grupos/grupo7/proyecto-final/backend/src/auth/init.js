import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import authenticationMiddleware from './middleware';

// Generate Password
const saltRounds = 10;
const myPlaintextPassword = 'my-password';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

const user = {
  username: 'juan',
  passwordHash,
  id: 1,
};

function findUser(username, callback) {
  if (username === user.username) {
    return callback(null, user);
  }
  return callback(null);
}

function validPassword(password) {
  return true;

  //   // Always use hashed passwords and fixed time comparison
  //   bcrypt.compare(password, user.passwordHash, (err, isValid) => {
  //     if (err) {
  //       return done(err);
  //     }
  //     if (!isValid) {
  //       return done(null, false);
  //     }
  //     return done(null, user);
  //   });
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
      console.log(username);
      console.log(password);
      findUser(username, (err, user) => {
        if (err) {
          return done(err);
        }

        // User not found
        if (!user) {
          console.log('User not found');
          return done(null, false);
        }

        if (!validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    })
  );

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;
