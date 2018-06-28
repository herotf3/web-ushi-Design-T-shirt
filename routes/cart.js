var express = require('express')
var router = express.Router();
var Cart = require('../models/mymodel/cart');
var formater= new Intl.NumberFormat(); //for money format

router.get("/", (req, res) => {
    var sessionCart = req.session.cart;
    var items={},totalPrice=0,totalQty=0;
    if (sessionCart != null) {        
        items = sessionCart.items;
        totalPrice = sessionCart.totalPrice;
        totalQty = sessionCart.totalQty;
        //load the         
    }
    res.render("cart", { title: "Giỏ hàng", Items: items, totalQty: totalQty, totalPrice: totalPrice ,login: req.isAuthenticated()});
});

router.post('/add-to-cart', (req, res) => {
    var item = {
        styleId: req.body.styleId,
        Qty: Number(req.body.Qty),
        size: req.body.size,
        price: Number(req.body.price),
        img: req.body.img,
        shirtName: req.body.shirtName,
        styleName: req.body.styleName
    };
    console.log('adding item', item);

    var cart = new Cart(req.session.cart ? req.session.cart : {});
    //get item Shirt_color by id
    cart.add(item);    
    req.session.cart = cart;  //save cart to session
    res.send({cart: cart,login: req.isAuthenticated()});
});

router.get('/delete-item',(req,res)=>{
    var itemId=req.query.id;
    if (!itemId){
        res.status(400).send({message: "Invalid action!",login: req.isAuthenticated()});
        return;
    }
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.delete(itemId);
    req.session.cart=cart;


    res.send({totalQty: cart.totalQty, totalPrice: formater.format(cart.totalPrice)+"đ" ,login: req.isAuthenticated()});
});
//edit in cart page
router.get('/edit-item',(req,res)=>{

    var itemId=req.query.id;
    var newQty=Number(req.query.qty);
    var newSize=req.query.size;
    console.log()
    if (!itemId||newQty==null||!newSize){
        res.status(400).send({message: "Invalid action!"});
        return;
    }
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.edit(itemId,newQty,newSize);
    req.session.cart=cart;
    res.send({totalQty: cart.totalQty, totalPrice: formater.format(cart.totalPrice)+"đ" ,login: req.isAuthenticated()});        
});
module.exports = router;