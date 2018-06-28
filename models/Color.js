'use strict';
module.exports = (sequelize, DataTypes) => {
  var Color = sequelize.define('Color', {    
    colorHex: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING
    }
  }, {timestamps:false});

  Color.associate = function(models) {
    // associations can be defined here        
    Color.hasMany(models.Shirt_Color,{foreignKey:'colorHex'});
  };
  return Color;
};