var express=require("express");
var router=express.Router();

var categoriesCtl=require('../controllers/categoriesController');
var shirtsCtl=require('../controllers/shirtsController');
var designCtl=require('../controllers/designController');
//shop page
router.get('/',(req,res)=>{    
    //get all categories
    var categories,shirts=[];    

    categoriesCtl.getAll((result)=>{
        categories=result;
        shirtsCtl.getAll((result)=>{
            shirts=result;
            res.render('shop',{categories:categories, shirts:shirts, title:'Cửa hàng'});
        });
    });
    //get all shirt
    
});

//view detail of a shirt
router.get('/xem',(req,res)=>{
    var id=req.query.designId;
    if (isNaN(id)){
        res.send("Oop! We don't see your dream shirt");
    }else
    designCtl.getById(id,(results)=>{
        res.render('detail',{detail:results, title:'Xem mẫu áo'});
        //res.json({results});
    });    
});
router.get('/xem_json',(req,res)=>{
    var id=req.query.designId;
    if (isNaN(id)){
        res.send("Oop! We don't see your dream shirt");
    }else
    designCtl.getById(id,(results)=>{        
        res.json({results});
    });    
});
//export module to be able to access via require
module.exports=router;