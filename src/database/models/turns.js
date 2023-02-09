function turns (sequelize, DataTypes){
/*
    alias = 'turn';   

    cols = {
        id: { type : Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        date: { type : DataTypes.DATE } ,
        time: { type : DataTypes.TIME } ,
        doctor_id: { type : DataTypes.INTEGER } ,
        user_id: { type : DataTypes.INTEGER } ,
    }

    let config = {camelCase: false,timestamps: false , tableName: "turn"};

    const turn = sequelize.define(alias, cols, config)

    turn.associate( function(models) {
        turn.belongsTo(models.user , {             
            as: "user" ,
            foreignKey: "user_id"

        })
        turn.belongsTo(models.doctor , {
            as: "doctor",
            foreignKey: "doctor_id"
        })
       
    })

*/
    return turns

}


module.exports = turns 