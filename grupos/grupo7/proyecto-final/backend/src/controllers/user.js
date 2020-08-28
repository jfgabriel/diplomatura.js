import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import authenticationMiddleware from '../auth/middleware';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'usuario';

router.get('/profile', authenticationMiddleware(), (req, res) => {
  res.json({ username: req.user.name });
});

router.post(
  '/login',
  passport.authenticate('local', { failureMessage: 'passport login failure' }),
  (req, res) => {
    console.log('login correct');
    res.json(req.user);
  }
);

router.route('/register').post(
  async (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const db = req.app.locals.db;
    const user = await helpers.getDataFilterByName(
      db,
      coleccion,
      req.body.username
    );

    if (user) {
      res.send('user already exists');
    } else {
      const newUser = helpers.insertData(db, coleccion, {
        username: req.body.username,
        password: hash,
      });
      next();
    }
  },
  passport.authenticate('local', {
    failureMessage: 'passport authenticate failure',
  }),
  (req, res, next) => {
    console.log('registration successful');
    req.logIn(req.user, (err) => {
      if (err) next(err);
      return true;
    });
    res.send('registration successful!!! :D');
  }
);

export default router;
