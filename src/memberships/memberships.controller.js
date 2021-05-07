const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const membershipService = require('./membership.service');

// routes
router.post('/', createSchema, create);
router.get('/', getAll);
module.exports = router;

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        monthlyPrice: Joi.number().required(),
        annualPrice: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    membershipService.create(req.body)
        .then(() => res.json({ code:'success', message: 'Registration successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    membershipService.getAll()
        .then(membership => res.json(membership))
        .catch(next);
}