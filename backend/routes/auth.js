const express = require("express")
const app = express()
const passport = require('../config/passport')
const fs = require("fs")
const path = "./users.json"
const Users = require('../users.json')
const { UserExist } = require("../midlewares/checkUser")


app.post(`/login`, passport.authenticate('local'), (req, res) => {
    if (req.user) {
      req.logIn(req.user, (err) => {
        if (err) throw err
        res.status(200).json(req.user)
      })
    }
})

app.post('/signup', UserExist, (req,res) => {

    const newUser = {
        id: Users[Users.length - 1].id + 1,    
        ...req.body,
        profile_picture : ""
    }

    fs.readFile(path, (err,data) => {

        if (err){
            console.log("Error", err);
            res.status(500).send('Internal server error')
        }

        let user = JSON.parse(data)

        user = [...user, newUser]
        
        fs.writeFile(path,JSON.stringify(user), (err) => {
            if (err){
                res.status(500).send("Internal server error")
            }
            res.json(newUser)
        })
    })
    
})

module.exports = app