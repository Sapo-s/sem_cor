const express = require('express')
const res = require('express/lib/response')
var mongoose = require('mongoose')

var routeProduto = require('./routes/produto');
var routeUsuario = require('./routes/usuario');

var Usuarios = require('./models/usuario');

var middleware = require("./middleware/middleware")// "chamei ele"middleware

const app = express()
app.use(express.json());

var swaggerUI = require('swagger-ui-express');
var swaggerFile = require('./swagger_output.json');
const { dataConverter } = require('swagger-autogen/src/handle-data');


var url = 'mongodb+srv://Admin:123@cluster0.np0cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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