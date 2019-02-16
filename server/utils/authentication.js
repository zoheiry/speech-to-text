const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        res.status(401);
      } else {
        res.status(400);
      }
      res.send(err);
    } else {
      req.body.currentUserId = decoded.id;
      next();
    }
  });
};

module.exports = { validateUser };
