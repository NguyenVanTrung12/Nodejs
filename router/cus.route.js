const CusController=require('../controller/CustomerController');
const route_cus = function(app) {
    //app.get('/dangky',UrseController.index);
    app.get('/dangky_cus',CusController.add);
    app.post('/dangky_cus',CusController.create);
    app.get('/login_cus',CusController.app);
    app.post('/login_cus',CusController.check_login);
    app.get('/logout_cus',CusController.appp);
   


}
module.exports = route_cus;