const express = require("express")
const router = express.Router()

const musicController = require('../controllers/music')

router.get("/musics", musicController.getAll)
router.post("/musics/add", musicController.add)

module.exports = router