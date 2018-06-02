var controller={};
var models=require('../models');

controller.getById=(id,callback)=>{
    models.Design
    .findOne({
        where: {id:id},
        include: [
            {model: models.Shirt, 
                include:[ 
                    {
                        model: models.TypeShirt,
                        attributes:['name']
                    },
                    {   
                        model: models.Shirt_Color,                         
                        include: [
                            {
                                model: models.Color, 
                                attributes:['name']
                            }
                        ]
                    }
                ]                
            }, 
            {model:models.User}
        ]
    })
    .then((result)=>{
        callback(result);
    });
};


//-----
module.exports=controller;