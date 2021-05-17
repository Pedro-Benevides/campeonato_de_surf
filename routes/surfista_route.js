const express = require('express')
const db = require('../database/db')
const router = express.Router()
const Surfista = require('../models/Surfista_model')

//Rotas relacionadas diretamente aos surfistas

//Cadastrar surfista
router.route('/cadastro')
	.get(function (req, res) {
		res.render('cadastro')
	})
	.post(function (req, res) {
		var erros = []
		if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
			erros.push({ msg: 'Nome invalido' })
		}
		if (!req.body.país || typeof req.body.país == undefined || req.body.país == null) {
			erros.push({ msg: 'País invalido' })
		}
		if (erros.length > 0) {
			res.render('cadastro', { erros: erros })
		}
		else {

			Surfista.create({
				nome: req.body.nome,
				país: req.body.país
			}).then(() => {
				req.flash("success_msg", "Surfista cadastrado com sucesso")
				res.redirect('/')
			}).catch(err => {
				if (err instanceof db.Sequelize.UniqueConstraintError) {
					req.flash("unique_msg", "Surfista ja cadastrado, confira o nome na lista")
					res.redirect('/surfista/participantes')
				} else {
					req.flash("error_msg", "Erro ao cadastrar, tente novamente")
					res.redirect('/')
				}
			})
		}
	})

//Exibir todos os surfistas
router.get('/participantes', function (req, res) {
	Surfista.findAll({ order: db.sequelize.random() }).then(function (participantes) {
		res.render('participantes', { participantes: participantes })
	}).catch(function (err) {
		req.flash("error_msg", "Erro ao acessar lista, tente novamente")
		res.redirect('/')
	})
})

//Filtrar surfistas pelo país
router.post('/filtro', async function (req, res) {
	var busca = []

	if (!req.body.país || typeof req.body.país == undefined || req.body.país == null) {
		busca.push({ msg: 'Digite o país para fazer a busca' })
	}

	if (await Surfista.findOne({ where: { país: req.body.país } }) == null) {
		busca.push({ msg: 'Nenhum surfista desse país foi registrado' })
	}

	if (busca.length > 0) {
		res.render('homepage', { busca: busca })
	}
	else {
		Surfista.findAll({ where: { país: req.body.país }, order: db.sequelize.random() }).then(function (participantes) {
			res.render('participantes', { participantes: participantes })
		}).catch(function (err) {
			req.flash("error_msg", "Erro ao aplicar filtro, tente novamente")
			res.redirect('/')
		})
	}

})

//Alterar nome e país de surfista
router.route('/att/:numero')
	.get(function (_req, res) {
		res.render('att')
	})
	.post((req, res,) => {
		var erros = []
		if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
			erros.push({ msg: 'Nome invalido' })
		}
		if (!req.body.país || typeof req.body.país == undefined || req.body.país == null) {
			erros.push({ msg: 'País invalido' })
		}
		if (erros.length > 0) {
			res.render('att', { erros: erros })
		}
		else {
			Surfista.update({ nome: req.body.nome, país: req.body.país }, { where: { numero: req.params.numero } }).then(function () {
				req.flash("success_msg", "Cadastro alterado com sucesso")
				res.redirect('/surfista/participantes')
			}).catch(function (err) {
				req.flash("error_msg", "Erro ao alterar dados, tente novamente")
				res.redirect('/surfista/participantes')
			})
		}
	})

//Deletar surfista
router.get('/cancelamento/:numero', function (req, res) {
	Surfista.destroy({ where: { numero: req.params.numero } }).then(function () {
		req.flash("success_msg", "Inscrição cancelada com sucesso")
		res.redirect('/')
	}).catch(function (err) {
		req.flash("error_msg", "Erro ao cancelar inscrição, tente novamente")
		res.redirect('/')
	})
})





module.exports = router

