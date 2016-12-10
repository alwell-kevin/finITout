var router = require('express').Router();


router.get('/', function (req, res) {
    res.status(200).json({"id": "123", "name": "Nick"});
});

router.post('/', function () {

});

module.exports = router;