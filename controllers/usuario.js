var Usuarios = require('../models/usuario');
var jwt = require('jsonwebtoken');


exports.incluir = async (req, res) => {
    // #swagger.tags = ['Usuários']   
    // #swagger.description = 'Incluir usuário'


    Usuarios.create(req.body, (err, data) => {

        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
            res.status(201).send({ mensagem: 'Usuário criado com sucesso!!!' })
        }
    });
}

exports.login = async (req, res) => {
    // #swagger.tags = ['Usuários']   
    // #swagger.description = 'Gerar token'

    var login = req.body.login
    var senha = req.body.senha

    Usuarios.findOne({ login, senha }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({ mensagem: 'Erro ao autenticar usuário!' })
        }
        else {
            if (data === null) {
                res.status(204).send({ mensagem: 'Usuário não encontrado!' })
            }
            else {

                var token = jwt.sign({ id: login }, '12707', { expiresIn: '20m' });
                console.log(token)
                res.status(200).send({ token: token })
            }
        }
    })
}