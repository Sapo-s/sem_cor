var Produtos = require('../models/produto');


exports.incluir = async (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Incluir um produto'

    objetoProduto = req.body
    console.log(objetoProduto.codigo)

    var codigo = objetoProduto.codigo


    if (objetoProduto.codigo === undefined) {
        return res.status(500).send({ mensagem: 'O código é obrigatório!!' })
    }

    Produtos.findOne({ codigo }, (err, data) => {

        if (err) {
            console.log(data)
        }

        if (data) {
            console.log(data)
            return res.status(500).send({ mensagem: 'O código já existe!!' })
        }
        else {
            Produtos.create(req.body, (err, data) => {

                if (err) {
                    console.log(err)
                }
                else {
                    console.log(data)
                    res.status(201).send({ mensagem: 'Produto criado com sucesso!!!' })
                }
            });

        }

    })

};


exports.buscar = async (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Incluir um produto'

    var codigo = req.params.codigo;

    Produtos.findOne({ codigo }, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({ mensagem: 'Erro ao buscar o registro!' })
        }
        else {
            if (data === null) {
                res.status(204).send({ mensagem: 'Registro não encontrado!' })
            }
            else {
                res.status(200).send(data)
            }
        }
    })

};
