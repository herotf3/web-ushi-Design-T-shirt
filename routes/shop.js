var express = require("express");
var router = express.Router();
var paypal = require('paypal-rest-sdk');

var categoriesCtl = require('../controllers/categoriesController');
var shirtsCtl = require('../controllers/shirtsController');
var designCtl = require('../controllers/designController');
//shop page
router.get('/', (req, res) => {
    //get all categories
    var categories, shirts = [];

    categoriesCtl.getAll((result) => {
        categories = result;
        shirtsCtl.getAll((result) => {
            shirts = result;
            res.render('shop', { categories: categories, shirts: shirts, title: 'Cửa hàng',login: req.isAuthenticated() });
        });
    });
    //get all shirt

});

//view detail of a shirt
router.get('/xem', (req, res) => {
    var id = req.query.designId;
    if (isNaN(id)) {
        res.send("Oop! We don't see your dream shirt");
    } else
        designCtl.getById(id, (results) => {
            res.render('detail', { detail: results, title: 'Xem mẫu áo' ,login: req.isAuthenticated()});
            //res.json({results});
        });
});
router.get('/xem_json', (req, res) => {
    var id = req.query.designId;
    if (isNaN(id)) {
        res.send("Oop! We don't see your dream shirt");
    } else
        designCtl.getById(id, (results) => {
            res.json({ results });
        });
});

//paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Afe_6LJuHZ8HpP1t9eXkPauPcpB2mzMLnvH-YZMGJ3vVQjQM8rr71MJiMLxNMyV-v2sMz9NKY9RMk_9M',
    'client_secret': 'EDBikA1ALyvST2XWuGMQukLb4_0LptwemYEz3ltU6RlgP0aWTmtfHMXtI0sRQmvroNEpzm3oQJjaHGyE'
});

//paypal
var successLink = "http://localhost:5000/success";
var cancelLink = "http://localhost:5000/cancel"

router.post('/pay', (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": successLink,
            "cancel_url": cancelLink
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    //create payment
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success',{login: req.isAuthenticated()});
        }
    });
});

router.get('/cancel', (req, res) => res.send('Cancelled',{login: req.isAuthenticated()}));

router.post('/order',(req,res)=>{
    res.render('order');
});
//export module to be able to access via require
module.exports = router;