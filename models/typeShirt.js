'use strict'
module.exports=(sequelize,DataTypes)=>{
    var TypeShirt=sequelize.define('TypeShirt',{
        name:{
            type: DataTypes.STRING
        },
        blank_front: DataTypes.STRING,  //url of front img &
        blank_back: DataTypes.STRING,   //back img
    },{
        timestamps:false, freezeTableName: true
    });
    //add relation key
    TypeShirt.associate=(models) =>{
        TypeShirt.hasMany(models.Shirt);
    };

    return TypeShirt;
};