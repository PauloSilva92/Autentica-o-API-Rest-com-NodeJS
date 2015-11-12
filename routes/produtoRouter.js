var express = require('express');
var router = express.Router();
var produtoController = require('../controllers/produtoController');


router.get('/',function(req, res){
	produtoController.list(function(resp){
		res.json(resp);
	})
});

router.post('/cadastrar', function(req, res){
	var nome = req.body.nome;
	var descricao = req.body.descricao;
	var valor = req.body.valor;
	
	produtoController.save(nome, descricao, valor, function(resp){
		res.json(resp);
	});
});

router.delete('/deletar/:id', function(req, res){
	var id = req.params.id;
	
	produtoController.delete(id, function(resp){
		res.json(resp);
	});
})

module.exports = router;