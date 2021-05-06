const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        code: { type: DataTypes.STRING, allowNull: false },
        color_list: { type: DataTypes.INTEGER, allowNull: false },
        isDefault: { type:DataTypes.BOOLEAN, defaultValue: false }
    };

    const options = {
        
    };

    return sequelize.define('Color', attributes, options);
}