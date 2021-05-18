const express = require('express')
const Nota = require('../models/Nota_model')
const Onda = require('../models/Onda_model')
const router = express.Router()


router.post('/parciais/surf1', async function(req, res){
    Nota.findOrCreate({ where: { ID_onda: req.body.ID_onda1 }, defaults: { notaParcial1: req.body.notaParcial1, notaParcial2: req.body.notaParcial2, notaParcial3: req.body.notaParcial3 } })

    var parciais = (parseFloat(req.body.notaParcial1) + parseFloat(req.body.notaParcial2) + parseFloat(req.body.notaParcial3)) / 3
    var media = JSON.stringify(parciais)

    await Onda.update({ Nota: media }, { where: { ondaID: req.body.ID_onda1 } }).then(function() {
        console.log('notas enviadas')
    }).catch(error => {
        req.flash("error_msg", "Erro ao iniciar onda, tente novamente")
        res.redirect('/surfista/participantes')
    })
    
})

router.post('/parciais/surf2', async function (req, res){
    Nota.findOrCreate({ where: { ID_onda: req.body.ID_onda2 }, defaults: { notaParcial1: req.body.notaParcial4, notaParcial2: req.body.notaParcial5, notaParcial3: req.body.notaParcial6 } })

    var parciais = (parseFloat(req.body.notaParcial4) + parseFloat(req.body.notaParcial5) + parseFloat(req.body.notaParcial6)) / 3
    var media = JSON.stringify(parciais)
    
    await Onda.update({ Nota: media }, { where: { ondaID: req.body.ID_onda2 } })
    
})




module.exports = router