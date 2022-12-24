const {Sequelize} = require('sequelize')

const dbConnection = require('../config/dbconfig')

const book = dbConnection.define('book',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
        
    },
    ImageURL:{
        type: Sequelize.STRING,
    allowNull: false
       
    },
    Price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

module.exports = book;