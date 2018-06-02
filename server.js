var express = require('express');
var expressHdbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var session = require('express-session');

var app = express();
//setting app
app.use(express.static(__dirname + '/public'));


var hbs = expressHdbs.create({
    extname: 'hbs', //phan mo rong cho handlebars template
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: { paginate: paginateHelper.createPagination }
});
hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
hbs.handlebars.registerHelper('isFirst', (i1, i2) => {
    if (i1 === 0 && i2 === 0)
        return "show";
    return i2;
});
hbs.handlebars.registerHelper('moneyFormat',(price)=>{
    var formatter = new Intl.NumberFormat();
    return formatter.format(price);
});
// Register `hbs.engine` with the Express app.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//session
var pgSession=require('connect-pg-simple')(session);
var sessionOptions={
    store: new pgSession({
        conString: "postgres://postgres:113kothang114@localhost:5432/db_ushi"
    }),
    secret: 'secretcode',
    resave: true,
    saveUninitialized : false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
};
app.use(session(sessionOptions));

//Define routes
//sync code with database
var models = require('./models');
app.get('/sync', (req, res) => {
    models.sequelize.sync().then(() => {
        res.send('synchoronizing code with database completed!');
    })
});

app.use((req,res,next)=>{
    res.locals.session=req.session; 
    next();
});

var shirtsController = require('./controllers/shirtsController');
app.get('/', (req, res) => {
    shirtsController.getFeatures((shirts) => {
        res.render('home', { title: "Ushi - Thời trang của bạn", shirts });
    });
});



//loging
var Passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var fs=require('fs');

app.use(Passport.initialize());
app.use(Passport.session());

app.route('/login')
.get((req, res) => res.render('login'))
.post(Passport.authenticate('local', {failureRedirect: '/', successRedirect:'/private'}))

app.post('/signup', (req, res) =>{
    var username = req.body.username;
    var password = req.body.password1;
    var obj = {usr: username, pwd: password}
    var json = JSON.stringify(obj)
    fs.readFile('./userDB.json', (err, data) => {
        if(err) {
            return console.log(err)
        }        
        var db = JSON.parse(data.toString())
        db.push(obj)
        fs.writeFile('./userDB.json', JSON.stringify(db), (err, result)=>{
            if(err) {
                return console.log(err)
            } else {
                console.log(result+ "ok")
            }
        })
    })
})

app.get('/private', (req, res)=> {
    if(req.isAuthenticated() ){
        res.send('Welcome to my page');
    } else {
        res.send('Bạn chưa đăng nhập');
    }
})

app.get('/loginOK', (req, res) => res.send("Bạn đã đăng nhập thành công!"))

// Passport
Passport.use(new LocalStrategy(
    (username, password, done) => {
        fs.readFile('./userDB.json', (err, data) => {
            const db = JSON.parse(data)
            const userRecord = db.find(user => user.usr == username)
            if (userRecord && userRecord.pwd == password) {
                return done(null, userRecord)
            } else {
                return done(null, false)
            }
        })
    }
))
Passport.serializeUser((user, done) => {
    done(null, user.usr)
})

Passport.deserializeUser((name, done) => {
    fs.readFile('./userDB.json', (err, data)=>{
        const db = JSON.parse(data)
        const userRecord = db.find(user=>user.usr==name)
        if(userRecord){
            return done(null, userRecord)
        }
        else {
            return done(null, false)
        }
    })
})

//routing module
var shop = require('./routes/shop');
app.use('/shop', shop);

//Shopping Cart
var cartRoute=require('./routes/cart');
app.use("/cart",cartRoute);


//Set sever port & Start sever
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log('Server is listening at ' + app.get('port'));
});