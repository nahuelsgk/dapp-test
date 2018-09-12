var express = require('express');
var router = express.Router();

let controller = require('../controllers/accountController');

router.get('/test', function (req, res, next) {
    res.status(200).json(
        {
            status: "ok",
            message: "Welcome to the api"
        }
    );
});

router.post('/account',  controller.postAccount);
router.get('/account/:account/balance', controller.getBalance);
router.get('/blockchain/status', controller.getBlockChainStatus);
router.post('/test', controller.postTest);
module.exports = router;