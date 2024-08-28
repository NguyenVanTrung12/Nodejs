const UrseController=require('../controller/UersController');
const route_urse = function(app) {
    //app.get('/dangky',UrseController.index);
    app.get('/dangky',UrseController.add);
    app.post('/dangky',UrseController.create);
    app.get('/login',UrseController.app);
    app.post('/login',UrseController.Dangnhap);
    app.get('/logout',UrseController.appp);
   


}
module.exports = route_urse;