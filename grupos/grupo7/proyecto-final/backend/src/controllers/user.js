import express from 'express';
import passport from 'passport';
import authenticationMiddleware from '../auth/middleware';
const router = express.Router();

router.get('/profile', authenticationMiddleware(), (req, res, next) => {
  res.json({ username: req.user.name });
});

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/user/login' }),
  (req, res) => {
    console.log('login correct');
    res.json(req.user);
  }
);

router.route('/register').post(
  (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 13);
    db.db()
      .collection('users')
      .findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          next(err);
        } else if (user) {
          res.send('user already exists :(');
        } else {
          db.db()
            .collection('users')
            .insertOne(
              {
                username: req.body.username,
                password: hash,
              },
              (err, doc) => {
                if (err) {
                  res.send('registration mongo error');
                } else {
                  next(null, user);
                }
              }
            );
        }
      });
  },
  passport.authenticate('local', {
    failureMessage: 'passport authenticate failure',
  }),
  (req, res, next) => {
    console.log('registration successful');
    req.logIn(req.user, (err) => {
      if (err) next(err);
      return console.log("i'm trying: " + req.user);
    });
    res.send('registration successful!!! :D');
  }
);

const ensureAuthenticated = (req, res, next) => {
  console.log('isAuth() is: ' + req.isAuthenticated());
  //   console.log(
  //     'session store: ' +
  //       util.inspect(req.session, { showHidden: false, depth: null })
  //   );
  if (req.isAuthenticated()) return next();
  res.send('user not authenticated, begone! >:(');
};

export default router;
