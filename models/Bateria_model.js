const db = require('../database/db')
const Surfista = require('./Surfista_model')

const Bateria = db.sequelize.define('bateria',{
    bateriaID:{
        type:db.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Surfista1:{
        type:db.Sequelize.INTEGER,
    },
    
    Surfista2:{
        type:db.Sequelize.INTEGER,
    },
})
Surfista.hasMany(Bateria,{foreignKey: 'Surfista1', sourceKey: 'numero'});
Surfista.hasMany(Bateria,{foreignKey: 'Surfista2', sourceKey: 'numero'});



module.exports= Bateria