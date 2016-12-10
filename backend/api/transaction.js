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

router.post('/:transactionId/approve', function (req, res) {
    res.status(200).send("this would be the approved thing");
});

router.post('/:transactionId/reject', function (req, res) {
    res.status(200).send("this would be where you reject");
});

module.exports = router;