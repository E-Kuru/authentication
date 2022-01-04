const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/passport")
const auth = require('./routes/auth')
const admin = require('./routes/admin')


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())

app.use(session({
    secret: 'MyAwesomeSecret',
    resave: true,
    saveUninitialized: false 
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', auth)
app.use('/admin', admin)

const port = 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})