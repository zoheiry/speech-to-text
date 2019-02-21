const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email }, (error, userInfo) => {
      if (error) {
        next(error);
      } else if (!userInfo) {
        res.status(400).send({ message: 'Invalid email' });
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), {
            expiresIn: '10h',
          });
          res.cookie('auth', token);
          res.send({ user: userInfo, token });
        } else {
          res.status(401).send({ message: 'Invalid password' });
        }
      }
    });
  },
  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findById(req.body.currentUserId);
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  },
  createUser: (req, res) => {
    const saltRounds = 10;
    if (!req.body.email || !req.body.password || !req.body.passwordConfirmation) {
      res.status(400).send({ message: 'All fields are required.' });
    } else if (req.body.password !== req.body.passwordConfirmation) {
      res.status(400).send({ message: 'Password and password confirmation must match.' });
    } else {
      User.create(
        { email: req.body.email, password: bcrypt.hashSync(req.body.password, saltRounds) },
        (error, user) => {
          if (error) {
            if (error.code === 11000) {
              res.status(409).send({
                message: `user with the email ${req.body.email} already exists`,
              });
            } else {
              res.status(400).send(error);
            }
          } else if (!user) {
            res.sendStatus(400);
          } else {
            res.send(user);
          }
        }
      );
    }
  },
  // TODO have a password confirmation check.
  changePassword: async (req, res) => {
    try {
      const user = await User.findById(req.body.currentUserId);
      const _user = await user.changePassword(req.body.password);
      res.send(_user);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
