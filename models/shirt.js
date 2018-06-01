'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shirt = sequelize.define('Shirt', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Shirt.associate = function(models) {
    // associations can be defined here
    Shirt.belongsTo(models.Category);
  };
  return Shirt;
};