const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const search = require('./bing')
const sequelize = new Sequelize('b_manager_cautari','reprez','',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})



const User = sequelize.define('user', {
	categorie: {
		type : Sequelize.STRING,
		allowNull : false
	},
	nume_cautare : {
		type : Sequelize.STRING,
		allowNull : false
	}
	
})

const Cautari_recente = sequelize.define('cautari_recente', {
    titlu_cautari : {
		type : Sequelize.STRING,
		allowNull : false
    },
    continut_cautari : {
        type : Sequelize.STRING,
        allowNull : false
    },
    link : {
		type : Sequelize.STRING
	}
	
})

User.hasMany(Cautari_recente)


const app = express()
app.use(bodyParser.json())
app.use(express.static('./b_manager_cautari/build'))
app.use(function(req,res,next)
{
	res.header("Access-Control-Allow-Origin","*")
	res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type")
	res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,DELETE,HEAD,PATCH");

	next()
})

app.get('/create', (req, res) => {
	sequelize.sync({force : true})
		.then(() => res.status(201).send('recreated all tables'))
		.catch(() => res.status(500).send('oops...'))	
})

app.get('/ping',(req,res)=>{
	console.warn('greseala')
	res.status(200).json({message: 'da'})
})

app.get('/users', (req, res) => {
    User.findAll()
		.then((results) => {
			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('oops...'))			
})

app.post('/users', (req, res) => {
    User.create(req.body)
		.then(() => {
			res.status(201).send('created')
		})
		.catch(() => res.status(500).send('oops...'))
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
		.then((result) => {
			if (result){
				res.status(200).json(result)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.catch(() => res.status(500).send('oops...'))
})

app.put('/users/:id', (req, res) => {
    User.findById(req.params.id)
		.then((result) => {
			if (result){
				return result.update(req.body)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('modified')
		})
		.catch(() => res.status(500).send('oops...'))
})

app.delete('/users/:id', (req, res) => {
    User.findById(req.params.id)
		.then((result) => {
			if (result){
				return result.destroy()
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('removed')
		})
		.catch(() => res.status(500).send('oops...'))
})

app.get('/users/:bid/cautari_recentes', (req, res) => {
    User.findById(req.params.bid)
		.then((result) => {
			if (result){
				return result.getCautari_recentes()
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then((results) => {
			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('oops...'))
})

	app.get('/users/:bid/cautari_recentes/:cid', (req, res) => {
	    User.findById(req.params.bid)
		.then((result) => {
			if (result){
				return result.getCautari_recentes({where : {id : req.params.cid}})
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then((result) => {
			if (result){
				res.status(200).json(result)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.catch(() => res.status(500).send('oops...'))	
})

app.post('/users/:bid/cautari_recentes', (req, res) => {
    User.findById(req.params.bid)
		.then((result) => {
			if (result){
				let chapter = req.body
				chapter.user_id = result.id
				return Cautari_recente.create(chapter)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).json('created')
		})
		.catch(() => res.status(500).send('oops...'))
})

app.put('/users/:bid/cautari_recentes/:cid', (req, res) => {
    Cautari_recente.findById(req.params.cid)
		.then((result) => {
			if (result){
				return result.update(req.body)
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('modified')
		})
		.catch(() => res.status(500).send('oops...'))
})

app.delete('/users/:bid/cautari_recentes/:cid', (req, res) => {
    Cautari_recente.findById(req.params.cid)
		.then((result) => {
			if (result){
				return result.destroy()
			}
			else{
				res.status(404).send('not found')	
			}
		})
		.then(() => {
			res.status(201).send('removed')
		})
		.catch(() => res.status(500).send('oops...'))
})


app.get( '/search/:terms',(req,res)=>{
    search(req.params.terms)
    .then((content)=>{
        res.status(200).send(content)
        
    })
    .catch((err)=>{
        console.warn(err)
        res.status(404).send('nope mai incearca')
    })
})
sequelize.sync({force : true})
	.then(() => console.log('created'))
	.catch((error) => console.log(error))
app.listen(8080)