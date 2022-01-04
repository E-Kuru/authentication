const users = require("../users.json")

const UserExist = (req, res, next) => {
  const { email } = req.body
  const CheckUser = users.find(e => e.email === email)

  if (CheckUser) {
      res.status(406).send("This email already exist")
    } else {
      next()
  }
}

const verifyUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("Unauthorized")
  } else {
    next()
  }
}

module.exports = {
    verifyUser,
    UserExist
}