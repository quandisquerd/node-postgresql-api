const postgre = require('../database')
const musicController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query("select * from musics")
            res.json({ msg: "OK", data: rows })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    }


}

module.exports = musicController