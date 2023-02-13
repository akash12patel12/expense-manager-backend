const express = require('express');
const userAuth = require('../middlewares/auth')
const premiumController = require('../controllers/premiumController');
const { use } = require('./userRoute');
const router = express.Router();
const AWS = require('aws-sdk');

router.get('/premium', userAuth.authenticate, premiumController.purchase)
router.post('/updatePayment', userAuth.authenticate, premiumController.updatePayment);
router.get('/checkpremium', userAuth.authenticate, premiumController.check);
router.get('/getLeaderBoard',  userAuth.authenticate, premiumController.getLeaderBoard);
router.get('/download',userAuth.authenticate, premiumController.downloader );
router.get('/getAllFiles', userAuth.authenticate, premiumController.getAllFiles)
module.exports = router;