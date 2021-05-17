//Conexão com o banco de dados
const Sequelize = require ('sequelize')
const sequelize = new Sequelize('handson','root','0818',{
    host:'localhost',
    dialect:'mysql'
})

module.exports= {
    Sequelize : Sequelize,
    sequelize: sequelize
}