const BrandController = require('../controller/BrandController');
const authMiddleware = require('../middlewares/authMiddlewares');
const route_brand = function(app) {
    app.get('/brand',authMiddleware.authcheck,BrandController.index);
    app.get('/add-brand',authMiddleware.authcheck,BrandController.add);
    app.post('/add-brand',authMiddleware.authcheck,BrandController.create);

  
    //định nghĩa thêm route sửa 
    app.get('/edit-brand/:id',authMiddleware.authcheck,BrandController.edit);
    app.post('/post-edit-brand',authMiddleware.authcheck,BrandController.update);
    //định nghĩa xóa
    app.post('/Brand/delete/:id',authMiddleware.authcheck,BrandController.delete);
}
module.exports = route_brand;
