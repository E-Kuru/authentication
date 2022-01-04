const express = require("express")
const app = express()
const users = require("../users.json")
const { verifyUser } = require("../midlewares/checkUser")

app.get('/', verifyUser, (req,res) => {
    res.send(users)
})

module.exports = app