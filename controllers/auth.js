const postgre = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authController = {
    signup: async (req, res, next) => {
        try {
            const { name, address, email, password, image } = req.body;
             const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const { rows } = await connect.query(checkUserQuery, [email]);

    if (rows) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }
            const hashedPassword = await bcrypt.hash(password, 5)
            const query = `INSERT INTO users( name, address, email, password, image, role ) VALUES ('${name}', '${address}','${email}', '${hashedPassword}', '${image}', 'member') RETURNING * `
            const result = await postgre.query(query)
            const user = result.rows[0]
            const token = jwt.sign({ id: user.id }, 'bo_quan', { expiresIn: '1d' })
            return res.json({ message: 'Đăng ký thành công !', token: token, user: user })
        } catch (err) {
            return res.status(500).json({ message: 'Loi api', msg: err.message })
        }
    },
    remove: async (req, res, next) => {
        try {
            const { id } = req.params
            const query = `DELETE FROM users WHERE id = ${id}`
            const result = await postgre.query(query)
            if (result.rowCount > 0) {
                return res.json({ message: 'Xóa thành công!' })
            } else {
                return res.json({ message: 'Lỗi xóa!' })
            }
        } catch (err) {
            return res.status(500).json({ message: 'Loi api', msg: err.message })
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body
            const query = `SELECT * FROM users WHERE email ='${email}'`
            const result = await postgre.query(query)
            const user = result.rows[0]
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                const token = jwt.sign({ id: user.id }, 'bo_quan', { expiresIn: "1d" })
                return res.json({ message: 'Đăng nhập thành công!', token: token, user: user })
            }
            return res.json({
                message: "Email hoặc mật khẩu không chính xác",
            });
        } catch (err) {
            return res.status(500).json({ message: 'Loi api', msg: err.message })
        }
    }
}

module.exports = authController
