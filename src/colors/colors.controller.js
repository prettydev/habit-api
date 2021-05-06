const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const colorService = require('./color.service');

// routes
router.post('/',  createSchema, create);
router.get('/', authorize(), getAll);
// router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), updateSchema, update);
// router.delete('/:id', authorize(), _delete);

module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        code: Joi.string().required(),
        color_list: Joi.number().required(),
        isDefault: Joi.boolean(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    colorService.create(req.body)
            .then(color => res.json(color))
            .catch(next);
}


function getAll(req, res, next) {
    colorService.getAll()
        .then(colors => res.json(colors))
        .catch(next);
}

// function getById(req, res, next) {
//     colorService.getById(req.params.id)
//         .then(color => res.json(color))
//         .catch(next);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         name: Joi.string().empty(''),
//         code: Joi.string().empty(''),
//     });
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     colorService.update(req.params.id, req.body)
//         .then(color => res.json(color))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     colorService.delete(req.params.id)
//         .then(() => res.json({ message: 'Color deleted successfully' }))
//         .catch(next);
// }