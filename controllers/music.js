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
    },
    remove: async (req, res) => {
        const { id } = req.params;
        try {
            const query = `DELETE FROM musics
WHERE id = ${id}`
            const result = await postgre.query(query);
            return res.json({ message: 'Xoa thanh cong!', data: result.rows[0] })
        } catch (err) {
            return res.json({ msg: err.message });
        }
    },
    search: async (req, res) => {
        const { name } = req.body;
        try {
            const query = 'SELECT * FROM musics WHERE name LIKE $1';
            const values = [`%${name}%`];
            const result = await postgre.query(query, values)
            return res.json({ message: 'Tìm Thấy Bài Hát!', data: result.rows })
        } catch (err) {
            return res.json({ msg: err.message });
        }
    },
    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            const query = `SELECT * FROM musics
WHERE id = ${id}`
            const result = await postgre.query(query);
            return res.json({ message: 'Lấy 1 thanh cong!', data: result.rows[0] })
        } catch (err) {
            return res.json({ msg: err.message });
        }
    },
}

module.exports = musicController