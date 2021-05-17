//Conexão com o banco de dados
const config = require('./config')
const Sequelize = require ('sequelize')
const sequelize = new Sequelize(config.DB,config.USER,config.PASSWORD,{
    host:config.HOST,
    dialect:config.dialect
})

module.exports= {
    Sequelize : Sequelize,
    sequelize: sequelize
}