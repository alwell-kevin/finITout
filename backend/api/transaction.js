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
    return transactions.updateTransaction(req.params.transactionId, {"Status": 1 })
        .then(data => {
            console.log("the update ", data);
            res.status(200).send(data);
        });
});

router.post('/:transactionId/reject', function (req, res) {
    return transactions.updateTransaction(req.params.transactionId, {"Status": 0 })
        .then(data => {
            console.log("the update ", data);
            res.status(200).send(data);
        });
});

module.exports = router;