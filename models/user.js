const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user_em', {
    id : {
        type : Sequelize.INTEGER,
        default : 1 ,
        autoIncrement  : true ,
        allowNull: false,
        primaryKey: true

    },
    name : {
        type :Sequelize.STRING,
        allowNull : false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail:true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
      },
    phone : {
        type : Sequelize.STRING,
        allowNull : false,
        unique: {
            args: true,
            msg: 'Phone  already in use!'
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    isPremium : {
        type: Sequelize.BOOLEAN
    },
    totalExpenses : {
        type : Sequelize.INTEGER,
        default : 0 , 
        allowNull : false
    }

});

module.exports = User;
