var express=require('express');
var expressHdbs=require('express-handlebars');
var paginateHelper=require('express-handlebars-paginate');
var bodyParser=require('body-parser');
var app=express();
//setting app
app.use(express.static(__dirname+'/public'));

var hbs=expressHdbs.create({
    extname: 'hbs', //phan mo rong cho handlebars template
    defaultLayout: 'layout',
    layoutsDir: __dirname+'/views/layouts',
    partialsDir: __dirname+'/views/partials',
    helpers:{paginate: paginateHelper.createPagination}
});
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
// Register `hbs.engine` with the Express app.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


//Define routes
app.get('/',(req,res)=>{
    res.render('home',{title:"Ushi - Thời trang của bạn"});
});

//Set sever port & Start sever
app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),()=>{
    console.log('Server is listening at '+app.get('port'));
});