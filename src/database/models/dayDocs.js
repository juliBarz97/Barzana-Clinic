function dayDocs (sequelize, DataTypes){

    alias = 'dayDoc';   

    cols = {
        id: { type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        doctors_id: { type : DataTypes.INTEGER } ,
        days_id: { type : DataTypes.INTEGER } ,
    }

    let config = {camelCase: false,timestamps: false , tableName: "dayDocs"};

    const dayDoc = sequelize.define(alias, cols, config)

    dayDoc.associate = function(models) {
        dayDoc.belongsTo(models.day , {             
            as: "day" ,
            foreignKey: "days_id"

        });
        dayDoc.belongsTo(models.doctor , {
            as: "doctor",
            foreignKey: "doctors_id"
        })
       
    }


    return dayDoc

}


module.exports = dayDocs 