const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const ForgotPassword = sequelize.define('forgotpassword', {
    id : {
        type : Sequelize.UUID,
        allowNull : false,
        primaryKey : true
    },
    active : Sequelize.BOOLEAN,
    expireby : Sequelize.DATE
});

module.exports = ForgotPassword ;