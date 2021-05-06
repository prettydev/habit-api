const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        monthlyPrice: { type: DataTypes.FLOAT, allowNull: false },
        annualPrice: { type: DataTypes.FLOAT, allowNull: false },
    };

    const options = {
       
    };

    return sequelize.define('Membership', attributes, options);
}