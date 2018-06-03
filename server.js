var express=require('express');
var expressHdbs=require('express-handlebars');
var paginateHelper=require('express-handlebars-paginate');
var bodyParser=require('body-parser');
var Passport=require('passport');
var session=require('express-session')
var LocalStrategy=require('passport-local').Strategy
var fs=require('fs')
var app=express();
//setting app
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "mysecret", cookie:{maxAge: 1000*60}}))
app.use(Passport.initialize());
app.use(Passport.session());

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
app.get('/', (req,res) => res.render('home'));
app.route('/login')
.get((req, res) => res.render('login'))
.post(Passport.authenticate('local', {failureRedirect: '/', successRedirect:'/private'}))

app.route('/singup')
.get((req, res)=> res.render('login'))
.post(signUpFunc());

app.get('/private', (req, res)=> {
    if(req.isAuthenticated() ){
        res.send('Welcome to my page');
    } else {
        res.send('Bạn chưa đăng nhập');
    }
})

app.get('/loginOK', (req, res) => res.send("Bạn đã đăng nhập thành công!"))

signUpFunc = (username, password) => {
    var obj = {id: username+password, usr: username, pwd: password}
    var json = JSON.stringify(obj)
    fs.writeFile('./userDB.json', json, 'utf8', callback);
}

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
//Set sever port & Start sever
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.log('Server is listening at '+app.get('port'));
});