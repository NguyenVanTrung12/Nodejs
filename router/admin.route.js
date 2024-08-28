const AdminController = require('../controller/AdminController');
const authMiddleware = require('../middlewares/authMiddlewares');
const route_tkadmin = function(app) {
    app.get('/tkadmin',authMiddleware.authcheck,AdminController.index);
    app.get('/add-tkadmin',authMiddleware.authcheck,AdminController.add);
    app.post('/add-tkadmin',authMiddleware.authcheck,AdminController.create);

  
    //định nghĩa thêm route sửa 
    app.get('/edit-tkadmin/:id',authMiddleware.authcheck,AdminController.edit);
    app.post('/post-edit-tkadmin',authMiddleware.authcheck,AdminController.update);
    //định nghĩa xóa
    app.post('/tkadmin/delete/:id',authMiddleware.authcheck,AdminController.delete);
}
module.exports = route_tkadmin;
