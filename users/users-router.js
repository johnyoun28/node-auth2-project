const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware");

function roleChecker(role) {
  return function (req, res, next) {
    if (req.decodedJwt.role === role) {
      next()
    } else {
      res.status(401).json({ message: 'you have no pawa' })
    }
  }
}

router.get("/", restricted, roleChecker(1), (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;


// 1- react form, login, gets token in the res.data.token
// 2- axios to make a request to a protected enpoint Authorization
