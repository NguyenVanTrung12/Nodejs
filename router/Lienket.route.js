const LkController=require('../controller/LienketController');

const route_Lk = function(app) {
    //app.get('/',TCController.add);
    app.get('/trangchulienket',LkController.add);
    app.get('/Timkiem',LkController.search);
}
module.exports = route_Lk;