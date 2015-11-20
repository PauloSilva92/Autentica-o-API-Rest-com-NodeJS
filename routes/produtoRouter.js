var express = require('express');
var router = express.Router();
var produtoController = require('../controllers/produtoController');
var usuarioController  =require('../controllers/usuarioController');


function pegarToken(req, res, next){
	var header = req.headers['authorization'];
	
	if(typeof header !== 'undefined'){
		req.token = header;
		next();
	}else{
		res.sendStatus(403);
	}
}

router.get('/',pegarToken,function(req, res){
	
	var token = req.token;
	usuarioController.authorize(token, function(resp){
		if (resp === true){
			produtoController.list(function(resp){
				res.json(resp);
			});
		}else{
			res.sendStatus(403);
		}
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