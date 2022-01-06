const express = require("express")
const app = express()
const multer = require("multer")
const fs = require("fs")
const moment = require('moment')
moment.locale('fr')

const upload = multer({ dest: 'public' })

app.post('/:id', upload.single('photo'), (req, res) => {

    const {id} = req.params

    const date = moment().format("DD-MM-YYYY-hh-mm-ss")

  const photoUrl = `${req.file.destination}/${date}-${req.file.originalname}`
  fs.renameSync(req.file.path, photoUrl)
  
  fs.readFile('./users.json', (err, data) => {

    const users = JSON.parse(data)

    const Index = users.findIndex(e => e.id === Number(id))

    users[Index].profile_picture = `http://localhost:5000/${req.file.originalname}`

    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
      res.json({ success: "File uploaded" })
    })
  })

})

module.exports = app