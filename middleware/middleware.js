//criar um uma resposta
//função já vem "pronta"

///request <- eé apenas um nome.
// 1 _ 2 (next() ) -> 3

jwt.sign({ foo: 'bar' }, privateKey, { algorithm: '12707' }, function(err, token) {
  console.log(token);
});
exports.request = (req, res, next) => {
    console.log('Resquest => ', req.method, req.url, req.body);
    next()
}
