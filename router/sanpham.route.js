const SPController=require('../controller/sanphamController');
//const setTitle = require('../middlewares/setTitle');
const route_Sp = function(app) {
    app.get('/sanpham',SPController.addd);
}
module.exports = route_Sp;