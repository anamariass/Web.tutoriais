const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Video = sequelize.define('Video', {

    titulo: {
        type: DataTypes.STRING
    },

    descricao: {
        type: DataTypes.TEXT
    },

    url: {
        type: DataTypes.STRING
    },

    curtidas: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

});

module.exports = Video;