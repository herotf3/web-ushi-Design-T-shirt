'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shirt_Color = sequelize.define('Shirt_Color', {   
    style_name: DataTypes.STRING, 
    img_front: DataTypes.STRING,
    img_back: DataTypes.STRING
  }, {freezeTableName: true, timestamps:false});

  Shirt_Color.associate = function(models) {
    // associations can be defined here    
    Shirt_Color.belongsTo(models.Color,{foreignKey:'colorHex'});
    Shirt_Color.belongsTo(models.Shirt);
  };
  return Shirt_Color;
};