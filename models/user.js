'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    user_name: DataTypes.STRING, 
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Design);
  };
  return User;
};