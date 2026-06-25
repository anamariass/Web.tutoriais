const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com SQLite realizada com sucesso!');
    })
    .catch(err => {
        console.log('Erro ao conectar:', err);
    });

module.exports = sequelize;

