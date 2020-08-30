import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { helpers } from '../db_helpers.js';

const router = express.Router();
const coleccion = 'usuario';
const secret = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
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
          secret
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
      email: req.body.email,
      password: hash,
    });
    const token = jwt.sign(
      {
        username: req.body.username,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 1, // 1 day
      },
      secret
    );
    res.json({ registration: 'ok', token: token, username: req.body.username });
  }
});

export default router;
