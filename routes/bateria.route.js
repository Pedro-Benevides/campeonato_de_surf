const express = require('express')
const router = express.Router()
const Bateria = require('../models/Bateria_model')
const Surfista = require('../models/Surfista_model')

//Rotas relacionadas a bateria

router.post('/confirm', async function (req, res) {
	var erros = []
	if (req.body.id1 == req.body.id2 && req.body.id1 > 0 && req.body.id2 > 0) {
		erros.push({ msg: 'Os numeros se referem ao mesmo surfista.' })
	}
	if (erros.length > 0) {
		Surfista.findAll().then(function (participantes) {
			res.render('participantes', { participantes: participantes, erros: erros })
		}).catch(error => {
			req.flash("error_msg","Erro ao inciar simulação, tente novamente")
			res.redirect('/')
		})
	}
	else {
		var disputa = await Bateria.create({Surfista1: req.body.id1,Surfista2: req.body.id2})
		var surf1 = await Surfista.findOne({where: { numero: req.body.id1 }})
		
		Surfista.findOne({where: { numero: req.body.id2 }}).then(function(surf2){
			res.render('confirm', { surf1:surf1,surf2:surf2, disputa:disputa })
		}).catch(error => {
			req.flash("error_msg", "Erro ao inciar simulação, tente novamente")
			res.redirect('/')
		})
		
	}
})


module.exports = router



