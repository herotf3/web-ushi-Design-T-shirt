var controller={};  //khoi tao doi tuong rong
var models=require('../models');

controller.getAll=(callback)=>{
    models.Category
    .findAll().then((result)=>{
        callback(result);
    });
};

module.exports=controller;