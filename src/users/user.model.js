const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        displayName: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: true },
        aboutme: { type: DataTypes.STRING, allowNull: true },
        uniqueString: { type:DataTypes.STRING },
        isValid: { type: DataTypes.BOOLEAN },
        membership: { type: DataTypes.INTEGER, defaultValue: 0 },
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['password'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}