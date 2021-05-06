const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        color_id: { type: DataTypes.INTEGER, allowNull: false },
        repeat: { type: DataTypes.STRING, allowNull: false },
        daily: { type: DataTypes.STRING, default: '', allowNull: true},
        time_per_day: { type: DataTypes.INTEGER, allowNull: true },
        remind: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
    };

    return sequelize.define('UserHabit', attributes, options);
}