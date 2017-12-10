var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")

var sequelize = new Sequelize('b_manager_cautari', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    define: {
        freezeTableName: true,
        timestamps: false
    }
})

sequelize.authenticate().then(function(){
    console.log('Ai reusit!')
})


var Users = sequelize.define('user', {
    nume: Sequelize.STRING,
    varsta: Sequelize.INTEGER,
    ocupatie: Sequelize.STRING,
    hobby: Sequelize.STRING,
    data: Sequelize.STRING
    
})

var Cautari_Recente = sequelize.define('cautari_recente', {
    category_id: Sequelize.INTEGER,
    istoric_cautari: Sequelize.STRING
})

Cautari_Recente.belongsTo(Users, {foreignKey: 'category_id', targetKey: 'id'})


var app = express()

app.use('/nodeamin', nodeadmin(app))

app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       
app.use(express.urlencoded()); 


app.get('/users', function(request, response) {
    Users.findAll().then(function(users){
        response.status(200).send(users)
    })
        
})

app.get('/users/:id', function(request, response) {
    Users.findOne({where: {id:request.params.id}}).then(function(user) {
        if(user) {
            response.status(200).send(user)
        } else {
            response.status(404).send()
        }
    })
})


app.post('/users', function(request, response) {
    Users.create(request.body).then(function(user) {
        response.status(201).send(user)
    })
})

app.put('/users/:id', function(request, response) {
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.update(request.body).then(function(user){
                response.status(201).send(user)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/users/:id', function(request, response) {
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/cautari_recente', function(request, response) {
    Cautari_Recente.findAll(
        {
            include: [{
                model: Users,
                where: { id: Sequelize.col('cautari_recente.category_id') }
            }]
        }
        
        ).then(
            function(cautari_recente) {
                response.status(200).send(cautari_recente)
            }
        )
})

app.get('/cautari_recente/:id', function(request, response) {
    Cautari_Recente.findById(request.params.id).then(
            function(cautare_recenta) {
                response.status(200).send(cautare_recenta)
            }
        )
})

app.post('/cautari_recente', function(request, response) {
    Cautari_Recente.create(request.body).then(function(cautare_recenta) {
        response.status(201).send(cautare_recenta)
    })
})

app.put('/cautari_recente/:id', function(request, response) {
        Cautari_Recente.findById(request.params.id).then(function(cautare_recenta) {
        if(cautare_recenta) {
            cautare_recenta.update(request.body).then(function(cautare_recenta){
                response.status(201).send(cautare_recenta)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/cautari_recente/:id', function(request, response) {
    Cautari_Recente.findById(request.params.id).then(function(cautare_recenta) {
        if(cautare_recenta) {
            cautare_recenta.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/users/:id/cautari_recente', function(request, response) {
    Cautari_Recente.findAll({where:{category_id: request.params.id}}).then(
            function(cautari_recente) {
                response.status(200).send(cautari_recente)
            }
        )
})

app.listen(8080)