var user = require('../models/user');
const bcrypt = require('bcrypt');

var UserController = {
    add: (req, res) => {
        res.render('Taikhoan/dangky');
    },

    create: (req, res) => {
        bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
            var email = req.body.email;
            var name = req.body.name;
            user.create({name, email, password: hashedPassword}, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect('/login');
                }
            });
        });
    },

    app: (req, res) => {
        res.render('Taikhoan/Dangnhap');
    },

    Dangnhap: (req, res) => {
        user.check_login(req.body.email, req.body.password, (err, data) => {
            if (err || !data) {
                res.send(err || 'Thông tin đăng nhập không chính xác');
            } else {
                req.session.login = data;
                return res.redirect('/admin');
            }
        });
    },

    appp: (req, res) => {
        req.session.login = null;
        return res.redirect('/login');
    }
};

module.exports = UserController;
