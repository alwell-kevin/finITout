var router = require('express').Router();

router.use('/transaction', require('./transaction'));

router.use('/user', require('./user'));

module.exports = router;