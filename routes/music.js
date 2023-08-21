const express = require("express")
const router = express.Router()

const musicController = require('../controllers/music')

router.get("/musics", musicController.getAll)
router.post("/musics/add", musicController.add)
router.delete("/musics/:id", musicController.remove)
router.post("/musics/search", musicController.search)
module.exports = router