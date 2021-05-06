const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    create,
};


async function getAll() {
    return await db.Color.findAll();
}

// async function getById(id) {
//     return await getColor(id);
// }

async function create(params) {
    const color = await db.Color.create(params);
    return color.get();
}

// async function update(id, params) {
//     const color = await getColor(id);
//     // copy params to color and save
//     Object.assign(color, params);
//     await color.save();

//     return color.get();
// }

// async function _delete(id) {
//     const color = await getColor(id);
//     await color.destroy();
// }

// // helper functions

// async function getColor(id) {
//     const color = await db.Color.findByPk(id);
//     if (!color) throw 'Color not found';
//     return color;
// }
