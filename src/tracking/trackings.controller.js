const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest   = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const trackingService = require('./tracking.service');
// routes

router.post('/', authorize(), createSchema, create);

module.exports = router;


function createSchema(req, res, next) {
    const schema = Joi.object({
        habit_id: Joi.number().required(),
        year: Joi.number().required(),
        month: Joi.number().required(),
        day: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    trackingService.create(req.user.id, req.body)        
        .then(() => res.json({ code:'success', message: 'Registration successful' }))
        .catch(next);
}

