const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./user.service');

// routes
router.post('/authenticate',authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.post('/signInWithSocial', signInWithSocial);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.get('/verify/:uniqueString', verify);
module.exports = router;

function signInWithSocial(req, res, next) {
    // console.log("data")
    // console.log(req.body);
    userService.signInWithSocial(req.body)
        .then(user => res.json(user))
        .catch(next);
}

async function verify(req, res, next) {
    const result = await userService.verify(req.params);
    return res.send(result)
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
   
    validateRequest(req, next, schema);
}

async function authenticate(req, res, next) {
    const result = await userService.authenticate(req.body)
    return res.json(result);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        // displayName: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

async function register(req, res, next) {
    const result = await userService.create(req.body)
    return res.json(result);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        displayName: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        avatar: Joi.string().empty(),
        aboutme: Joi.string().empty(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}