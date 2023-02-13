const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Order = sequelize.define('order', {
  
    paymentid : Sequelize.STRING,
    orderid : Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = Order;