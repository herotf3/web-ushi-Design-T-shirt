var express=require("express");
var router=express.Router();

var categoriesCtl=require('../controllers/categoriesController');
var shirtsCtl=require('../controllers/shirtsController');
//shop page
router.get('/',(req,res)=>{    
    //get all categories
    var categories,shirts=[];    

    categoriesCtl.getAll((result)=>{
        categories=result;
    });
    //get all shirt
    shirtsCtl.getAll((result)=>{
        shirts=result;
        res.render('shop',{categories:categories, shirts:shirts, title:'Cửa hàng'});
    });    
});

//view detail of a shirt
router.get('/xem',(req,res)=>{
    var id=req.query.shirtId;
    if (isNaN(id)){
        res.send("Oop! We don't see your dream shirt");
    }else
    shirtsCtl.findById(id,(results)=>{
        res.render('detail',{detail:results, title:'Xem mẫu áo'});
    });    
});
//export module to be able to access via require
module.exports=router;