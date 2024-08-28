const CtController=require('../controller/ChitietController');

const route_Ct = function(app) {
    //app.get('/',TCController.add);
    //app.get('/product/:id',CtController.getProductDetail);
    app.get('/chitiet/:id',CtController.addd);
}
module.exports = route_Ct;