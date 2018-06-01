var controller={};  //khoi tao doi tuong rong
var models=require('../models');

//them ham get all
controller.getAll=function(callback){//get all shirts
    models.Shirt
    .findAll().then((results)=>{        
        callback(results);  //truyen cho ham callback de xu ly
    });
};
module.exports=controller;