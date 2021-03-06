var controller={};  //khoi tao doi tuong rong
var models=require('../models');

//them ham get all
controller.getAll=function(callback){//get all shirts
    models.Shirt
    .findAll({include: [{model: models.Design }]})
    .then((results)=>{        
        callback(results);  //truyen cho ham callback de xu ly
    });
};
controller.getFeatures=(callback)=>{
    models.Shirt
    .findAll({
        where:{isFeature:true},  //search shirt only feature    
        include: [{model: models.Design }]
    })
    .then((results)=>{        
        callback(results);  //truyen cho ham callback de xu ly
    });
};

controller.findById=(id,callback)=>{
    models.Shirt
    .findOne({
        where: {id: id},
        include: [{
            model: models.Design,
            include: [models.User]
        }]
    })
    .then((result)=>{
        callback(result);
    })
};

 controller.getShirt_Color=(id,callback)=>{
    models.Shirt_Color
    .findOne({
        where: {id:id},
        include :[{model: models.Shirt, attributes:["price"]}]
    })
    .then((result)=>{
        callback(result);
    });
}; 
//---
module.exports=controller;