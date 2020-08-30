import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'usuario';

router.post('/login', async (req, res) => {
  // Token
  const db = req.app.locals.db;
  const user = await helpers.getDataFilterByName(
    db,
    coleccion,
    req.body.username
  );
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, isValid) => {
      if (isValid) {
        const token = jwt.sign(
          {
            username: req.body.username,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 1, // 1 day
          },
          'jwt_secret'
        );
        res.json({ login: 'ok', token: token, username: req.body.username });
      } else {
        res.send('Password incorrecto');
      }
    });
  } else {
    res.send('user not found');
  }
});

router.route('/register').post(async (req, res, next) => {
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
    const user = helpers.insertData(db, coleccion, {
      username: req.body.username,
      password: hash,
    });
    const token = jwt.sign(
      {
        username: req.body.username,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 1, // 1 day
      },
      'jwt_secret'
    );
    res.json({ registration: 'ok', token: token });
  }
});

export default router;
