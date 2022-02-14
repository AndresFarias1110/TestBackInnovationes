'use strict';

const router = require('express').Router();
const prefix = '';
const auth = require('../middleware/auth');

const controller = require('../controllers/log.controller');

router.get(`${prefix}/`, auth, controller.all);
router.post(`${prefix}/`, auth, controller.create);
router.get(`${prefix}/:id`, auth, controller.info);
router.put(`${prefix}/:id`, auth, controller.update);
router.delete(`${prefix}/:id`, auth, controller.delete);

module.exports = router;