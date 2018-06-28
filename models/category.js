'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING,
      allowNull:true
    } 
  }, {timestamps: false});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Shirt);
  };
  return Category;
};