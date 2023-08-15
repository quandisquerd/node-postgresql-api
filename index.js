const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.json())


const musicRouter = require('./routes/music')

app.use("/api", musicRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))