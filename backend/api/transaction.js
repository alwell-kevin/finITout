var router = require('express').Router();
var transactions = require('../database/flaggedTransactions');


router.get('/', function (req, res) {
    res.status(200).send();
});

router.get('/:elderId', function (req, res) {
    return transactions.getFlaggedTransactionsByElderId(req.params.elderId)
        .then(data => {
            console.log(" the data", data);
            res.status(200).send(data);
        })
});

module.exports = router;