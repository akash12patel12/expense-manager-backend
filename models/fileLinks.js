const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const FileLink = sequelize.define('filelink', {
    id : {
        type : Sequelize.INTEGER,
        default : 1 ,
        autoIncrement  : true ,
        allowNull: false,
        primaryKey: true

    },
    filelink : {
        type : Sequelize.STRING,
        allowNull: false,
    }

});

module.exports = FileLink;
