const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Produto;

const sequelize = require('./db');
const Produto = require('./Produto');

sequelize.sync()
.then(() => {
    console.log("Banco sincronizado!");
});