var controller = {};
var models = require('../models');

//get all design
controller.getById = (id, callback) => {
    models.Design
        .findOne({
            where: { id: id },
            include: [
                {
                    model: models.Shirt,
                    include: [
                        {
                            model: models.TypeShirt,
                            attributes: ['name']
                        },
                        {
                            model: models.Shirt_Color,
                            include: [
                                {
                                    model: models.Color,
                                    attributes: ['name']
                                }
                            ]
                        }
                    ]
                },
                { model: models.User }
            ]
        })
        .then((result) => {
            callback(result);
        });
};

//get all TypeShirt
controller.getAllTypeShirt = (callback) => {
    models.TypeShirt
        .findAll({})
        .then((result) => {
            callback(result);
        });
}

//save user design
controller.saveUserDesign = (ud, url1, url2, callback) => {
    models.Design
        .create({
            name: ud.designName,
            pattern_front: ud.pattern_front,
            pattern_back: ud.pattern_back,
            desciption: "",
            createdAt: Date.now(), updatedAt: Date.now()
        }).then((design) => {
            //create the shirt that user create for order
            models.Shirt
                .create({
                    price: ud.price,
                    img_url: url1,
                    DesignId: design.id,
                    TypeShirtId: ud.typeShirt,
                    CategoryId: 1,
                    isFeature: false
                }).then((shirt) => {
                    //create shirt w color (check if exist first)
                    models.Color.findOne({
                        where: { colorHex: ud.colorProduct }
                    }).then((result) => {
                        if (result == null) {
                            models.Color.create({ colorHex: ud.colorProduct, name: "CL" })
                                .then((color) => {
                                    models.Shirt_Color
                                        .create({
                                            style_name: ud.designName,
                                            img_front: url1,
                                            img_back: url2,
                                            colorHex: ud.colorProduct,
                                            ShirtId: shirt.id
                                        }).then((style) => {
                                            callback(design);
                                        });

                                });
                        } else {
                            models.Shirt_Color
                                .create({
                                    style_name: ud.designName,
                                    img_front: url1,
                                    img_back: url2,
                                    colorHex: ud.colorProduct,
                                    ShirtId: shirt.id
                                }).then((style) => {
                                    callback(design);
                                });
                        }
                    });

                });

        });
}
//-----
module.exports = controller;