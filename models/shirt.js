'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shirt = sequelize.define('Shirt', {    
    price: {
      type: DataTypes.INTEGER,
      validate :{
        notEmpty: true,
        min: 1000
      }
    },
    img_url: DataTypes.STRING,  //img represent for design+type of Shirt
    isFeature: DataTypes.BOOLEAN

  }, {});
  Shirt.associate = function(models) {
    // associations can be defined here
    Shirt.belongsTo(models.Category);
    Shirt.belongsTo(models.Design);
    Shirt.belongsTo(models.TypeShirt);
    Shirt.hasMany(models.Shirt_Color);
  };
  return Shirt;
};