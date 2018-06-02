'use strict'
module.exports=(sequelize, DataTypes)=>{
    var Design=sequelize.define('Design',{
        name:{
            type: DataTypes.STRING,
            len: [2,100]
        },
        description:{
            type: DataTypes.TEXT
        },
        pattern_front:{
            type: DataTypes.STRING
        },
        pattern_back:{
            type: DataTypes.STRING
        }
    },{});

    Design.associate=(models)=>{
        Design.hasMany(models.Shirt);
        Design.belongsTo(models.User);
    };
    return Design;
};