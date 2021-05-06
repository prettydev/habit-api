const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        habit_id: { type: DataTypes.INTEGER },
        year: { type:DataTypes.STRING },
        month: { type: DataTypes.STRING, allowNull: false },
        day: { type: DataTypes.INTEGER, allowNull: false },
    };

    const options = {
    };

    return sequelize.define('Tracking', attributes, options);
}