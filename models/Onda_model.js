const db = require('../database/db')
const Surfista = require('./Surfista_model')
const Bateria = require('./Bateria_model')

const Onda = db.sequelize.define('onda',{
    ondaID:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Bateria:{
        type:db.Sequelize.INTEGER,
        require:true,
    },
    Surfista:{
        type:db.Sequelize.INTEGER,
        require:true,
    },
    Nota:{
        type:db.Sequelize.FLOAT,
    },
})
Surfista.hasMany(Onda,{foreignKey: 'Surfista', sourceKey: 'numero'})
Bateria.hasMany(Onda,{foreignKey: 'Bateria', sourceKey: 'bateriaID'})


module.exports=Onda