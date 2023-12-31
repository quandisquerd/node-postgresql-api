const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})
app.use(express.json())
const musicRouter = require('./routes/music')
const albumRouter = require('./routes/album')
const authRouter = require('./routes/auth')
app.use("/api", musicRouter)
app.use("/api", albumRouter)
app.use("/api", authRouter)
app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))
