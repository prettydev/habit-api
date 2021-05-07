const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest   = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userHabitService = require('./userHabit.service');
// routes

router.post('/', authorize(), createSchema, create);
router.delete('/:id', authorize(), _delete);
router.get('/', authorize(), getAll);
module.exports = router;

function getAll(req, res, next) {
    userHabitService.getAll(req.user.id)
                .then(habits => res.json(habits))
                .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        color_id: Joi.number().required(),
        repeat: Joi.string().required(),
        daily: Joi.string(),
        time_per_day: Joi.number().required(),
        remind: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    console.log(req);
    userHabitService.create(req.user.id, req.body)
        .then(() => res.json({ code:'success', message: 'Registration successful' }))
        .catch(next);
}

function _delete(req, res, next) {
    userHabitService.delete(req.params.id)
        .then(() => res.json({ message: 'Color deleted successfully' }))
        .catch(next);
}