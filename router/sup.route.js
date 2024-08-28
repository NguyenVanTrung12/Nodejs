const SupController=require('../controller/SupController');
const authMiddleware = require('../middlewares/authMiddlewares');
const route_sup = function(app) {
    app.get('/sup',authMiddleware.authcheck,SupController.index);
    app.get('/add-sup',authMiddleware.authcheck,SupController.add);
    app.post('/add-sup',authMiddleware.authcheck,SupController.create);

  
    //định nghĩa thêm route sửa 
    app.get('/edit-sup/:id',authMiddleware.authcheck,SupController.edit);
    app.post('/post-edit-sup',authMiddleware.authcheck,SupController.update);
    //định nghĩa xóa
    app.post('/Sup/delete/:id',authMiddleware.authcheck,SupController.delete);

   


}
module.exports = route_sup;