function expertise (sequelize, DataTypes){
/*
    alias = 'expertise';   

    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        area: {type: DataTypes.STRING} 
    }

    let config = { camelCase: false , timestamps: false , tableName: "expertise" };

    const expertise = sequelize.define(alias, cols, config)

    expertise.associate( function(models) {
        expertise.hasMany( models.doctor, {
            as : "doctors",
            foreign_key : "area_id"       
        })
    })
*/
    return expertise

}


module.exports = expertise 