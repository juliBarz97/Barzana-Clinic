function users (sequelize, DataTypes){

    alias = 'user';   

    cols = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        first_name: { type : DataTypes.STRING } ,
        last_name: { type : DataTypes.STRING } ,
        city: { type : DataTypes.STRING } ,
        email: { 
            type : DataTypes.STRING ,
            validate : {
                isEmail : true
            }
        },
        phone: { type : DataTypes.INTEGER } ,
        birthdate: { type : DataTypes.DATE } ,
        image: { type: DataTypes.STRING } ,
        sex: { type : DataTypes.STRING },
        password: { type : DataTypes.STRING } ,
    }

    let config = {camelCase: false,timestamps: false , tableName: "users"};

    const user = sequelize.define(alias, cols, config)


    user.associate = function(models) {
        user.belongsToMany(models.doctor, {
            as: "doctors",
            through : "turns",
            foreignKey : "users_id", //??,
            otherKey : "doctors_id" 
        })
    }



    return user

}


module.exports = users 