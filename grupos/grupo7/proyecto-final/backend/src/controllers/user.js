import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/usuario';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (isValid) {
        const token = jwt.sign(
          {
            username,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 day
          },
          process.env.JWT_SECRET
        );
        res.json({ login: 'ok', token: token, username });
      } else {
        res.send('Password incorrecto');
      }
    });
  } else {
    res.send('user not found');
  }
});

router.route('/register').post(async (req, res, next) => {
  const { username, password, email } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const user = await UserModel.findOne({ username });

  if (user) {
    res.send('Ya existe un usuario con ese nombre');
  } else {
    const user = UserModel.create({
      username,
      password: hash,
      email,
    });

    const token = jwt.sign(
      {
        username,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 day
      },
      process.env.JWT_SECRET
    );
    res.json({ registration: 'ok', token: token, username });
  }
});

export default router;
