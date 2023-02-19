const express = require('express');
const expenseController = require('../controllers/expenseController');
const userAuth = require('../middlewares/auth')

const router = express.Router();

router.post('/addex',userAuth.authenticate,  expenseController.addex);
router.post('/getAll',userAuth.authenticate, expenseController.getAll );
router.post('/delete',userAuth.authenticate, expenseController.deleteOne);
router.get('/getTotalNumberOfExpenses', userAuth.authenticate, expenseController.getTotalNumberOfExpenses)
router.get('/getTotalOfUser',userAuth.authenticate, expenseController.getTotalOfUser );
module.exports = router;