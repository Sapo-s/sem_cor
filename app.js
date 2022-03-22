const express = require('express')
const app = express()


var mongoose = require('mongoose')

var url = 'mongodb+srv://Admin:123@cluster0.np0cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
var routeProduto = require('./routes/produto')
var routeUsuario = require('./routes/usuario')
var middleware = require("./middleware/middleware")
var swaggerUI = require('swagger-ui-express')
var swaggerFile = require('./swagger_output.json')

app.use(express.json());




const options = {
  poolSize: 5,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Started! - - -')
})

mongoose.connection.on('error', (err) => {
  console.log('Erro ao conectar ao mongodb!!!', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Fechou a conexão com o banco!!!')
})



app.use(middleware.request)// "Foi ativado" o middleware

app.get('/', function (req, res) {
  // #swagger.tags = ['Root']   
  // #swagger.description = 'Root'

  res.send('Opa!')
})

app.use('/produtos', routeProduto);

app.use('/usuario', routeUsuario); //criar o usuario

app.use('/look', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);