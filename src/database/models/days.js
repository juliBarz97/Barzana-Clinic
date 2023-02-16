function days (sequelize, dataTypes){
    alias = 'day'
    cols = {
        id: { type : dataTypes.INTEGER, primaryKey : true, autoIncrement : true },
        day: { type : dataTypes.TEXT }
    }

    let config = { camelCase: false , timestamps: false , tableName: "days" };

    const day = sequelize.define(alias, cols, config)

    day.associate = function (models){
        day.belongsToMany(models.doctor, {
            as: "doctors",
            through:"dayDocs",
            foreignKey: "days_id",
            otherKey: "doctors_id"
        })
    }

    return day
}

module.exports = days