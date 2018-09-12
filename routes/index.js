var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista de Produtos', docs: docs });
  })
})

/* GET new product page */
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"nome":"","quantidade":""}, action: '/new' });
});

/* GET new product confirm */
router.post('/new', function(req, res) {
  var nome = req.body.nome;
  var quantidade = parseInt(req.body.quantidade);
  global.db.insert({nome, quantidade}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})

/* GET new edit route */
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', { title: 'Edição de Produto', doc: docs[0], action: '/edit/' + docs[0]._id });
    });
})

/* GET new edit confirm*/
router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var nome = req.body.nome;
  var quantidade = parseInt(req.body.quantidade);
  global.db.update(id, {nome, quantidade}, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
    });
});

/* GET new delete route*/
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;
