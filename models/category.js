'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      len:[2,120]    
    },
    description:{
      type: DataTypes.STRING,
      allowNull:true
    } 
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Shirt);
  };
  return Category;
};