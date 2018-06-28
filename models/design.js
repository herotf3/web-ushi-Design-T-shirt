'use strict'
module.exports=(sequelize, DataTypes)=>{
    var Design=sequelize.define('Design',{
        name:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.TEXT
        },
        pattern_front:{
            type: DataTypes.JSON
        },
        pattern_back:{
            type: DataTypes.JSON
        }
    },{});
    
    Design.associate=(models)=>{
        Design.hasMany(models.Shirt);
        Design.belongsTo(models.User);
    };
    return Design;
};