const express = require('express')
const res = require('express/lib/response')
var mongoose = require('mongoose')

var routeProduto = require('./routes/produto');
var routeUsuario = require('./routes/usuario');

var middlewares = require('./middlewares/middlewares');

const app = express()

var swaggerUI = require('swagger-ui-express');
var swaggerFile = require('./swagger_output.json');


var url = 'mongodb+srv://admin:123@cluster0.3q6c6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {
  poolSize: 5,
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('Ok, conectado ao mongodb!!!')
})

mongoose.connection.on('error', (err) => {
  console.log('Erro ao conectar ao mongodb!!!', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Fechou a conexão com o banco!!!')
})

app.use(express.json());

app.use(middlewares.request);

app.get('/', function (req, res) {
  // #swagger.tags = ['Root']   
  // #swagger.description = 'Root'

  res.send('Opa!')
})

app.use('/produtos', middlewares.autenticacao, routeProduto);
app.use('/usuarios', routeUsuario);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);