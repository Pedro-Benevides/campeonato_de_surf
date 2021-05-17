const express = require('express')
const Bateria = require('../models/Bateria_model')
const Onda = require('../models/Onda_model')
const Surfista = require('../models/Surfista_model')
const router = express.Router()

//Rotas relacionadas a onda
//Cria ondas na mesma bateria
router.get('/disputa/:bateriaID', async function (req, res) {
    var chave = await Bateria.findOne({ where: { bateriaID: req.params.bateriaID } })
    var compet1 = await Onda.create({ Bateria: req.params.bateriaID, Surfista: chave.Surfista1, })
    var compet2 = await Onda.create({ Bateria: req.params.bateriaID, Surfista: chave.Surfista2, })
    var surf1 = await Surfista.findOne({ where: { numero: chave.Surfista1 } })

    Surfista.findOne({ where: { numero: chave.Surfista2 } }).then(function (surf2) {
        res.render('disputa', { surf1: surf1, surf2: surf2, chave: chave, compet1: compet1, compet2: compet2 })
    }).catch(error => {
        req.flash("error_msg", "Erro ao iniciar onda, tente novamente")
        res.redirect('/surfista/participantes')
    })

})
//Define o vencedor fazendo a soma das duas maiores médias de notas parciais de cada surfista
router.get('/vencedor/:surf1/:surf2/:bateriaID', async function (req, res) {
    //Pegando as duas maiores notas do primeiro surfista
    var vencedor1 = await Onda.findAll({ where: { Surfista: req.params.surf1,Bateria:req.params.bateriaID }, order: [['Nota', 'DESC']] })
    var notaFinal1 = 0
    for (let i = 0; i < 2; i++) {
        notaFinal1 = notaFinal1 + parseFloat(vencedor1[i].Nota)
    }

    //Pegando as duas maiores notas do segundo surfista 
    var vencedor2 = await Onda.findAll({ where: { Surfista: req.params.surf2,Bateria:req.params.bateriaID }, order: [['Nota', 'DESC']] })
    var notaFinal2 = 0
    for (let i = 0; i < 2; i++) {
        notaFinal2 = notaFinal2 + parseFloat(vencedor2[i].Nota)
    }

    //Decidindo vencedor
       var notaFinal = {notaF:0}
       
    if (notaFinal1 > notaFinal2) {

        notaFinal.notaF = notaFinal1.toFixed(1)

        Surfista.findOne({ where: { numero: req.params.surf1 } }).then(function (vencedor) {
            res.render('vencedor', { vencedor: vencedor, notaFinal: notaFinal })
        }).catch(function () {
            req.flash("error_msg", "Erro ao finalizar simulação, tente novamente")
            res.redirect('/surfista/participantes')
        })

    } else {
        notaFinal.notaF = notaFinal2.toFixed(1)

        Surfista.findOne({ where: { numero: req.params.surf2 } }).then(function (vencedor) {
            res.render('vencedor', { vencedor: vencedor, notaFinal: notaFinal })
        }).catch(function () {
            req.flash("error_msg", "Erro ao finalizar simulação, tente novamente")
            res.redirect('/surfista/participantes')
        })

    }

})

module.exports = router