const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const Expense = sequelize.define("expense", {
  id: {
    type : Sequelize.INTEGER,
    default: 1,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
