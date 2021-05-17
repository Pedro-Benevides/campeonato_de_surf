//Carregando modulos
const express = require("express")
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

//Configs

//Sessao
app.use(session({
	secret: "campeonatodesurf",
	resave: true,
	saveUninitialized: true,
}))
app.use(flash())

//Middlewares
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg")
	res.locals.error_msg = req.flash("error_msg")
	res.locals.unique_msg = req.flash("unique_msg")
	next()
})

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Handlebars->Template engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Public
app.use(express.static(path.join(__dirname, 'public')))



//Rotas
const surfista_route = require('./routes/surfista_route')
const bateria_route = require('./routes/bateria.route')
const onda_route = require('./routes/onda_route')
const notas_route = require('./routes/nota_route')

//Homepage
app.get("/", function (_req, res) {
	res.render('homepage')
})

//Interação com os surfistas
app.use('/surfista', surfista_route)
//Interação com a bateria
app.use('/bateria', bateria_route)
//Interação com a onda
app.use('/onda', onda_route)
//Interação com as notas
app.use('/nota', notas_route)


//Outros
const PORT = 3000
app.listen(PORT, () => {
	console.log("Servidor rodando na URL http://localhost:3000")
})


