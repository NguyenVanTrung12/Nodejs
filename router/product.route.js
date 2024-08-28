const ProductController=require('../controller/ProductController');
const multer = require('multer');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/authMiddlewares');
const route_product = function(app) {

    app.use(bodyParser.urlencoded({ extended: true }));
    var thumucluu = multer.diskStorage({
        destination: (req, file,callback) => {
            // Định nghĩa nơi file đc lưu
            callback(null, './public/Img');
        },
        filename:(req,file, callback) =>{
            // Kiểm tra định dạng file upload
            let math = ['image/png','image/jpeg','image/webp'];
            if (math.indexOf(file.mimetype) === -1) {
                let errmess = 'File ảnh up lên không đúng định dạng';
                return callback(errmess, null);
            }
            // Thêm tiền tố thay đổi tên file
            file = `${file.originalname}`;
            callback(null,file);
        }
    });
    var upload = multer({ storage: thumucluu });





    app.get('/pro',authMiddleware.authcheck,ProductController.index);
    app.get('/add-pro',authMiddleware.authcheck,ProductController.add);
    app.post('/add-pro',authMiddleware.authcheck,upload.single('hinhanh'),ProductController.create);

  
    //định nghĩa thêm route sửa 
    app.get('/edit-pro/:id',authMiddleware.authcheck,ProductController.edit);
    app.post('/post-edit-pro',authMiddleware.authcheck,upload.single('hinhanh'),ProductController.update);
    //định nghĩa xóa
    app.post('/Pro/delete/:id',authMiddleware.authcheck,ProductController.delete);

   


}
module.exports = route_product;