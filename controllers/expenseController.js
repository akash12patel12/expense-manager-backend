const Expense = require("../models/expense");
const User = require("../models/user");
const UserServices = require("../services/userServices");



exports.addex = (req, res) => {
  Expense.create({
    amount: req.body.amount,
    desc: req.body.desc,
    cat: req.body.cat,
    userEmId: req.user.userId,
  })
    .then((result) => {
      User.increment("totalExpenses", {
        by: req.body.amount,
        where: { id: req.user.userId },
      });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getAll = async (req, res) => {
const offset = req.body.offset * req.body.limit;
const limit = req.body.limit;

  const result = await UserServices.getExpenses(req, {
    limit :limit,
    offset :offset,
    where: { userEmId: req.user.userId },
    attributes: ["id", "desc", "amount", "cat"],
  });

  res.json(result);
};


exports.getTotalOfUser =(req,res)=>{
  User.findByPk(req.user.userId).then(user=>{
    res.json({total : user.totalExpenses})
  }).catch(err=>{
    console.log(err)
  })
}

exports.deleteOne = (req, res) => {
  Expense.findByPk(req.body.id).then((expense) => {
    if (expense) {
      if (expense.userEmId === req.user.userId) {
        User.decrement("totalExpenses", {
          by: expense.amount,
          where: { id: req.user.userId },
        });
        Expense.destroy({ where: { id: req.body.id } }).then((respo) => {

          res.json(respo);
        });
      } else {
        console.log("Not loggedin");
      }
    }
  });
};

exports.getTotalNumberOfExpenses = async (req,res)=>{
  let Count  =  await Expense.count({
      where : {
        UserEmId : req.user.userId
      }
    })

  res.json({count : Count});
}
