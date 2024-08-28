var conn = require('../database/connect');
const bcrypt = require('bcrypt');
const user = {
    getAll: (callback) => {
        return conn.query("SELECT * FROM users", callback);
    },
    findById: (id, callback) => {
        return conn.query(`SELECT * FROM users WHERE id = ${id}`, callback);
    },
    create: (data, callback) => {
        return conn.query(`INSERT INTO users(name,email,password) VALUES('${data.name}','${data.email}','${data.password}')`, callback);
    },
    update: (data, callback) => {
        return conn.query(`UPDATE users SET name='${data.name}',email='${data.email}','${data.password}' WHERE id=${data.id}`, callback);
    },
    delete: (id, callback) => {
        return conn.query("delete from users WHERE id =" + id, callback);
    },
    check_login: (email, password, callback) => {
        var sql = "SELECT * FROM users WHERE email='" + email + "'";
        conn.query(sql, (err, data) => {
            if (data[0]) {
                bcrypt.compare(password, data[0].password, (err, result) => {
                    if (result)
                        // Đăng nhập thành công
                        return callback(null, data[0]);
                    else
                        return callback(err, null);

                })
                //return callback(null,data[0]);
            } else {
                let err = "Sai thông tin";
                return callback(err, null);
            }
        });
    }
}
module.exports = user;