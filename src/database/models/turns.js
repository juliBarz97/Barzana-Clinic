function turns (sequelize, DataTypes){

    alias = 'turn';   

    cols = {
        id: { type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        date_turn: { type : DataTypes.DATE } ,
        time_turn: { type : DataTypes.TIME } ,
        doctors_id: { type : DataTypes.INTEGER } ,
        users_id: { type : DataTypes.INTEGER } ,
    }

    let config = {camelCase: false,timestamps: false , tableName: "turns"};

    const turn = sequelize.define(alias, cols, config)

    turn.associate = function(models) {
        turn.belongsTo(models.user , {             
            as: "user" ,
            foreignKey: "users_id"

        });
        turn.belongsTo(models.doctor , {
            as: "doctor",
            foreignKey: "doctors_id"
        })
       
    }


    return turn

}


module.exports = turns 