const db = require('../database/db')
const Onda = require('./Onda_model')

const Nota = db.sequelize.define('nota',{
    notaID:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    notaParcial1:{
        type:db.Sequelize.FLOAT,
    },
    notaParcial2:{
        type:db.Sequelize.FLOAT,
    },
    notaParcial3:{
        type:db.Sequelize.FLOAT,
    },
    ID_onda:{
        type:db.Sequelize.INTEGER,
    },
})

Onda.hasMany(Nota,{foreignKey: 'ID_onda', sourceKey: 'ondaID'})


module.exports=Nota