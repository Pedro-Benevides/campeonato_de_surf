const express = require('express')
const Bateria = require('../models/Bateria_model')
const Nota = require('../models/Nota_model')
const Onda = require('../models/Onda_model')
const Surfista = require('../models/Surfista_model')
const router = express.Router()


router.post('/parciais', async function(req,res){
    //processando as notas do primeiro surfista
    var parciais1 = await Nota.create({ ID_onda: req.body.ID_onda1,notaParcial1: req.body.notaParcial1, notaParcial2: req.body.notaParcial2, notaParcial3: req.body.notaParcial3 })
    var mediaParcial1 = (parseFloat(req.body.notaParcial1) + parseFloat(req.body.notaParcial2) + parseFloat(req.body.notaParcial3)) / 3
    var mediaFinal1 = JSON.stringify(mediaParcial1)
    await Onda.update({ Nota: mediaFinal1 }, { where: { ondaID: req.body.ID_onda1 } })

    //processando notas do segundo surfista
    var parciais2 = await Nota.create({ ID_onda: req.body.ID_onda2, notaParcial1: req.body.notaParcial4, notaParcial2: req.body.notaParcial5, notaParcial3: req.body.notaParcial6  })
    var mediaParcial2 = (parseFloat(req.body.notaParcial4) + parseFloat(req.body.notaParcial5) + parseFloat(req.body.notaParcial6)) / 3
    var mediaFinal2 = JSON.stringify(mediaParcial2)
    await Onda.update({ Nota: mediaFinal2 }, { where: { ondaID: req.body.ID_onda2 } })

    //para renderizar novamente a pagina
    var chave = await Bateria.findOne({ where: { bateriaID: req.body.bateriaID } })
    var compet1 = await Onda.findOne({where:{ Bateria: req.body.bateriaID, Surfista: chave.Surfista1,} })
    var compet2 = await Onda.findOne({where:{ Bateria: req.body.bateriaID, Surfista: chave.Surfista2,} })
    var surf1 = await Surfista.findOne({ where: { numero: chave.Surfista1 } })
    Surfista.findOne({ where: { numero: chave.Surfista2 } }).then(function (surf2) {
        res.render('disputa', { surf1:surf1, surf2: surf2, compet1: compet1, compet2: compet2, parciais1:parciais1,parciais2:parciais2 })
        
    }).catch(error => {
        req.flash("error_msg", "Erro ao processar notas, tente novamente")
        res.redirect('/surfista/participantes')
    })
})

router.post('/parciais/surf1', async function(req, res){
      parciais1 = await Nota.create({ ID_onda: req.body.ID_onda1,notaParcial1: req.body.notaParcial1, notaParcial2: req.body.notaParcial2, notaParcial3: req.body.notaParcial3 })


    var mParciais = (parseFloat(req.body.notaParcial1) + parseFloat(req.body.notaParcial2) + parseFloat(req.body.notaParcial3)) / 3
    var media = JSON.stringify(mParciais)

    await Onda.update({ Nota: media }, { where: { ondaID: req.body.ID_onda1 } })
    
    //objetos para renderizar novamente a pagina
    var chave = await Bateria.findOne({ where: { bateriaID: req.body.bateriaID } })
    var compet1 = await Onda.findOne({where:{ Bateria: req.body.bateriaID, Surfista: chave.Surfista1,} })
    var compet2 = await Onda.findOne({where:{ Bateria: req.body.bateriaID, Surfista: chave.Surfista2,} })
    var surf1 = await Surfista.findOne({ where: { numero: chave.Surfista1 } })
    Surfista.findOne({ where: { numero: chave.Surfista2 } }).then(function (surf2) {
        res.render('disputa', { surf1:surf1, surf2: surf2, compet1: compet1, compet2: compet2, parciais1:parciais1,parciais2:parciais2 })
        
    }).catch(error => {
        req.flash("error_msg", "Erro ao processar notas, tente novamente")
        res.redirect('/surfista/participantes')
    })
    
})

router.post('/parciais/surf2', async function (req, res){
     parciais2 = await Nota.create({ ID_onda: req.body.ID_onda2, notaParcial1: req.body.notaParcial4, notaParcial2: req.body.notaParcial5, notaParcial3: req.body.notaParcial6  })

    var mParciais = (parseFloat(req.body.notaParcial4) + parseFloat(req.body.notaParcial5) + parseFloat(req.body.notaParcial6)) / 3
    var media = JSON.stringify(mParciais)
    
    await Onda.update({ Nota: media }, { where: { ondaID: req.body.ID_onda2 } })
    
    //objetos para renderizar novamente a pagina
    var chave = await Bateria.findOne({ where: { bateriaID: req.body.bateriaID } })
    var compet1 = await Onda.findOne({where:{ Bateria: req.body.bateriaID, Surfista: chave.Surfista1,} })
    var compet2 = await Onda.findOne({where:{ Bateria: req.body.bateriaID, Surfista: chave.Surfista2,} })
    var surf1 = await Surfista.findOne({ where: { numero: chave.Surfista1 } })
    Surfista.findOne({ where: { numero: chave.Surfista2 } }).then(function (surf2) {
        res.render('disputa', { surf1:surf1, surf2: surf2, compet1: compet1, compet2: compet2, parciais2:parciais2,parciais1:parciais1 })
    }).catch(error => {
        req.flash("error_msg", "Erro ao processar notas, tente novamente")
        res.redirect('/surfista/participantes')
    })

    
})




module.exports = router