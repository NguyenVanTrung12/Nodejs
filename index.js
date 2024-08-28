const { name } = require('ejs');
const express = require('express');
const app = new express();
app.set('view engine', 'ejs');
const session = require('express-session');
const bodyParser = require('body-parser');
const Joi = require('joi');
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret:'abcdefgh', // MÃ bảo mật
    resave:true,
    saveUninitialized:false
}));
app.use((req,res,next)=>{
    res.locals.login = req.session.login;
    next();
})


app.get('/', (req, res) => {
    res.send("Xin chào các bạn đến với express");
});
var path=require('path');
app.use(express.static(path.join(__dirname,'/public')));

const mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlhh'
});
// Cấu hình lưu file ảnh
var fileanh='';
const Luutru = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Img');
    },
    filename: (req, file, callback) => {
        fileanh = file.originalname;
        callback(null, file.originalname);
    }
})
// Khai báo biến upload để thực thi
var upload = multer({ storage: Luutru });
var path = require('path');
const { Server } = require('http');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/Img')));


app.get('/trangchu', (req, res) => {
    res.sendFile(__dirname + "/home.html");
})
conn.connect(function (err) {
    if (err) throw err;
    console.log("Kết nối thành công");
})
app.get('/home', (req, res) => {
    var sql = "select * from brand_sp";
    conn.query(sql, (err, cate) => {
        if (err) throw err;
        res.render('trangchu', { cat: cate });
    })
});
app.get('/cate', (req, res) => {
    var sql = "select * from Brand_sp";
    conn.query(sql, (err, cate) => {
        if (err) throw err;
        res.render('Caterory/Danhsach', { cat: cate });
    })
})
app.get('/cate/them', (req, res) => {
    res.render('Caterory/AddCate')
})
app.get('/cate/sua/:Id', (req, res) => {
    var sql = "select * from Brand_sp where Id=" + req.params.Id;
    conn.query(sql, (err, cate) => {
        if (err) throw err;
        conn.query(sql, (err, cate) => {
            if (err) throw err;
            res.render('Caterory/EditCate', { cat: cate[0] })
        })
    })

})
app.post('/cate/luu', upload.single('hinhanh'), (req, res) => {
    const Scheme = Joi.object().keys({
        Brand_name: Joi.string().required().messages({ 'string.empty': 'Tên không được để trống' }),
    });
    const { error } = Scheme.validate(req.body, Joi.optional);
    if (error) {
        res.render('Caterory/AddCate', { err: error.details });
    } else {
        var sql = "INSERT INTO brand_sp( Brand_name,images ,Status) VALUES ('" + req.body.Brand_name + "','" + fileanh + "','" + (req.body.Status = 'on' ? 1 : 0) + "')";
        conn.query(sql, (err, cate) => {
            if (err) throw err;
            res.redirect('/cate');
        })
    }
fileanh='';
})
app.post('/cate/capnhat', upload.single('hinhanh'), (req, res) => {
    
    var sql = `UPDATE brand_sp SET Brand_name='${req.body.Brand_name}',images='${fileanh}',Status='${req.body.Status = 'on' ? 1 : 0}' WHERE Id = ${req.body.Id}`
    conn.query(sql, (err, cate) => {
        if (err) throw err;
        res.redirect('/cate');
    })
    fileanh='';
})
app.get('/cate/xoa/:Id', (req, res) => {
    var sql = "delete  from Brand_sp where Id=" + req.params.Id;
    conn.query(sql, (err, cate) => {
        if (err) throw err;
        res.redirect('/cate');
    })
})
app.get('/sanpham', (req, res) => {
    var sp = [{ ten: "Máy tính LENOVO", ha: "https://anphat.com.vn/media/product/41075_laptop_lenovo_legion_5_15ach6_82jw00jpvn_anphatpc_36.jpg", gia: 21000000 },
    { ten: "Máy tính DELL", ha: "https://anphat.com.vn/media/product/47156_1.jpg", gia: 19000000 },
    { ten: "Máy tính HP", ha: "https://hanoicomputercdn.com/media/product/75387_laptop_hp_pavilion_15_eg3094tu__8c5l5pa___5_.jpg", gia: 20000000 },
    ]
    res.render('sp', { pro: sp });
})


// Đăng ký
app.get('/dangky',(req,res)=>{
    res.render('Taikhoan/Dangky');
});
app.post('/dangky',(req,res)=>{
    var sql="INSERT INTO users(name,email,password) VALUES('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')";
    conn.query(sql,(err,data)=>{
        if(err) throw err 
        res.redirect('/admin');
    });
});
app.get('/login',(req,res)=>{
    res.render('Taikhoan/Dangnhap');
});
check_login=(email,password,callback)=>{
    conn.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,(err,data)=>{
        if(data[0]) {
            return callback(null,data[0]);
        } else {
            let err = "Sai thông tin";
            return callback(err,null);
        }
    });
}
app.post('/login',(req,res)=>{
    check_login(req.body.email,req.body.password,(err,result)=>{
        if(err) {
            res.send(err);
        } else {
            req.session.login = result;
            return res.redirect('/admin');
        }
    })
})
app.get('/logout',(req,res)=>{
    req.session.login = null;
    return res.redirect('/admin');
});
// Chat
//var express = require('express');
//const { Socket } = require('socket.io');
//app=express();
var server = require('http').createServer(app);
io=require('socket.io')(server);
server.listen(4000);
app.get('/chat',(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})
io.on("connection",function(socket){
    socket.on("user_chat",(data)=>{
        console.log(data);
        io.sockets.emit("Server_chat",data);
    })
});

// Bài tập lớn
app.get('/admin',(req,res)=>{
    res.render('Admin/admin');
})



// Api
app.get('/categoryy',(req,res)=>{
    conn.query("select * from category_sp",(err,data)=>{
        if(err) {
            res.send(err)
        } else {
            res.end(JSON.stringify(data));
        }
    })
}),
app.get('/categoryy/:id',(req,res)=>{
    conn.query("select * from category_sp where id="+req.params.id,(err,data)=>{
        if(err) {
            res.send(err)
        } else {
            res.end(JSON.stringify(data));
        }
    })
}),
app.post('/categoryy/them',(req,res)=>{
    var param = req.body;
    conn.query("insert into category_sp set ?",param,(err,data)=>{
        if(err) {
            res.send(err)
        } else {
            res.end(JSON.stringify(data));
        }
    })
}),
app.put('/categoryy/sua',(req,res)=>{
    var param = req.body;
    conn.query("UPDATE `category_sp` SET `category_name`='?',`status`='?' WHERE id=?",[param.category_name,param.status,param.id],(err,data)=>{
        if(err) {
            res.send(err)
        } else {
            res.end(JSON.stringify(data));
        }
    })
}),
app.delete('/categoryy/sua',(req,res)=>{
    conn.query("delete * from category_sp where id=",[req.body.id],(err,data)=>{
        if(err) {
            res.send(err)
        } else {
            res.end(JSON.stringify(data));
        }
    })
})


var server = app.listen(3000,"127.0.0.1",function ()  {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Sever được khởi tạo");
});