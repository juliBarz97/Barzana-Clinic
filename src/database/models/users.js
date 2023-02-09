function users (sequelize, DataTypes){
/*
    alias = 'user';   

    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        first_name: { type : Datatypes.STRING } ,
        last_name: { type : Datatypes.STRING } ,
        city: { type : Datatypes.STRING } ,
        email: { 
            type : DataTypes.VARCHAR(255) ,
            validate : {
                isEmail : true
            }
        },
        phone: { type : DataTypes.INTEGER } ,
        birthdate: { type : DataTypes.DATE } ,
        image: { type: DataTypes.VARCHAR(255) } ,
        password: { type : DataTypes.VARCHAR(255) } ,
    }

    let config = {camelCase: false,timestamps: false , tableName: "user"};

    const user = sequelize.define(alias, cols, config)


    user.associate( function(models) {
        user.belongsToMany (models.doctors, {
            as: "doctors",
            through : "turns",
            foreignKey : "turn_id", //??,
            otherKey : "doctor_id" 
        })
    })


*/
    return users

}


module.exports = users 