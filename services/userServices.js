const User = require('../models/user')
const Expense = require('../models/expense')
const getExpenses = async(req, where)=>{
   if(where){
     const expenses = await Expense.findAll(where)
     if(expenses)
       return expenses;
     else 
        return {'message' :  'FoundNot'}

   }
 
   else {
     const expenses = await Expense.findAll({where : { userEmId : req.user.userId}})
     return expenses ;
   }
}


module.exports = {
    getExpenses
}