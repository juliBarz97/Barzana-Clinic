function doctors (sequelize, DataTypes){
/*
    alias = 'doctor';   

    cols = {
        id: { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
        name: { type : DataTypes.STRING } ,
        city: { type : DataTypes.STRING } ,
        email: { type : DataTypes.VARCHAR} ,
        phone: { type : DataTypes.INTEGER } ,
        days_available: { type : DataTypes.STRING} , //chequear
        image: { type : DataTypes.VARCHAR } ,
        expertise_id: { type : DataTypes.INTEGER } ,
    }
    
    
    let config = {camelCase: false,timestamps: false , tableName: "doctors"};

    const doctor = sequelize.define(alias, cols, config)

    doctor.associate( function(models) {
        doctor.belongsToMany (models.users, {
            as: "doctors",
            through : "turns",
            foreignKey : "turn_id", //??,
            otherKey : "user_id" 
        })
    })
*/
    return doctors

}


module.exports = doctors 