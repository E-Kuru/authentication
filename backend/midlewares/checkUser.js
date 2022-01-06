const users = require("../users.json")

const UserExist = (req, res, next) => {
  const { email,username } = req.body
  const CheckMail = users.find(e => e.email === email)
  const CheckUsername = users.find(e => e.username === username)

  if (CheckMail) {
      res.status(406).send("This email already exist")
    }
    else if (CheckUsername){
      res.status(406).send("This username already exist")
    }
    else {
      next()
  }
}

const verifyUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({error : "Unauthorized"})
  } else {
    next()
  }
}

module.exports = {
    verifyUser,
    UserExist
}