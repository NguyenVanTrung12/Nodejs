const CategoryController=require('../controller/CategoryController');
const authMiddleware = require('../middlewares/authMiddlewares');
const route_category = function(app) {
    app.get('/category',authMiddleware.authcheck,CategoryController.index);
    app.get('/add-category',authMiddleware.authcheck,CategoryController.add);
    app.post('/add-category',authMiddleware.authcheck,CategoryController.create);

  
    //định nghĩa thêm route sửa 
    app.get('/edit-category/:id',authMiddleware.authcheck,CategoryController.edit);
    app.post('/post-edit-category',authMiddleware.authcheck,CategoryController.update);
    //định nghĩa xóa
    app.post('/Category/delete/:id',authMiddleware.authcheck,CategoryController.delete);

   


}
module.exports = route_category;