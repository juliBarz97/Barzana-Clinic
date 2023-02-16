function expertises (sequelize, dataTypes){

    alias = 'expertise';   

    cols = {
        id: {type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        area_expertise: {type: dataTypes.STRING} 
    }

    let config = { camelCase: false , timestamps: false , tableName: "expertises" };

    const expertise = sequelize.define(alias, cols, config)

    expertise.associate =  function(models) {
        expertise.hasMany( models.doctor, {
            as : "doctors",
            foreign_key : "expertise_id"       
        })
    }

    return expertise

}


module.exports = expertises