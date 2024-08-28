const TCController=require('../controller/trangchuController');

const route_Tc = function(app) {
    //app.get('/',TCController.add);
    app.get('/',TCController.addd);
}
module.exports = route_Tc;