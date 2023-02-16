function doctors (sequelize, DataTypes){

    alias = 'doctor';   

    cols = {
        id: { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
        name: { type : DataTypes.STRING } ,
        city: { type : DataTypes.STRING } ,
        email: { type : DataTypes.STRING} ,
        phone: { type : DataTypes.INTEGER } ,
        days_available: { type : DataTypes.STRING} , //chequear
        image: { type : DataTypes.STRING } ,
        expertise_id: { type : DataTypes.INTEGER } ,
        birthdate: { type : DataTypes.DATE}
    }
    
    
    let config = {camelCase: false,timestamps: false , tableName: "doctors"};

    const doctor = sequelize.define(alias, cols, config)

    doctor.associate = function(models) {
       doctor.belongsToMany(models.user, {
            as: "users",
            through : "turns",
            foreignKey : "doctors_id", //??,
            otherKey : "users_id" 
        });
        doctor.belongsTo(models.expertise ,{
            as: "areas",
            foreignKey: "expertise_id"
        }) ;
        doctor.belongsToMany(models.day, {
            as: "days",
            through: "dayDocs",
            foreignKey: "doctors_id",
            otherKey: "days_id",
        })
    }
    

    return doctor

}


module.exports = doctors 