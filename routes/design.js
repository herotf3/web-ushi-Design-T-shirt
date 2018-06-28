var express = require('express');
var router = express.Router();
//
var designController = require('../controllers/designController');
router.get('/', (req, res) => {
    designController.getAllTypeShirt((types) => {
        res.render('design', { title: "Ushi | Thiết kế", typeShirts: types ,login: req.isAuthenticated()});
    });

});
router.get('/json', (req, res) => {
    designController.getAllTypeShirt((types) => {
        res.json({ typeShirts: types });
    });

});

function saveImgBase64(data1,filename1, data2, filename2) {
    var base64Data1 = data1.replace(/^data:image\/png;base64,/, "");
    var base64Data2 = data2.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("./public"+filename1, base64Data1, 'base64', function (err) {
        console.log(err);
    });
    require("fs").writeFile("./public"+filename2, base64Data1, 'base64', function (err) {
        console.log(err);
    });
}
//save user design to database
router.post('/save-user-design', (req, res) => {
    var userDesign = req.body.userDesign;
    var shirtFront = req.body.shirtFront;
    var shirtBack = req.body.shirtBack;
    //save img
    var url1="/upload/"+ userDesign.designName+"_front.png";
    var url2="/upload/"+userDesign.designName+"_back.png";
    saveImgBase64(shirtFront,url1,shirtBack,url2);

        if (!userDesign) {
            res.status(404).send("Invalid action");            
        } else {
            designController.saveUserDesign(userDesign,url1,url2, (design) => {
                res.send({gotoURL:'http://localhost:5000/shop/xem?designId=' + design.id});
            });
        }        
});
//
module.exports = router;