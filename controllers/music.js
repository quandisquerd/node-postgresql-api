const postgre = require('../database')
const musicController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query("select * from musics")
            res.json({ msg: "OK", data: rows })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    add: async (req, res) => {
        const { name, image, file, album_id } = req.body;
        try {
            const query = `
        INSERT INTO musics (name, image, file, album_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
            const values = [name, image, file, album_id];
            const result = await postgre.query(query, values);
            res.json({ msg: 'Added new music', data: result.rows[0] });
        } catch (error) {
            res.json({ msg: error.message });
        }
    }
}

module.exports = musicController