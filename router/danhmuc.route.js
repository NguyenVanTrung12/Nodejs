const DmController=require('../controller/DanhmucController');

const route_dm = function(app) {
    //app.get('/',TCController.add);
    app.get('/danhmuc/:id',DmController.add);
}
module.exports = route_dm;





