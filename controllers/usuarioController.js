var Usuario = require('../models/Usuario');

exports.save = function(nome, senha, callback){
	Usuario.findOne({'nome':nome}, function(erro, usuario){
		if(erro){
			callback('Deu erro');
		}else if(usuario){
			callback('Usuario ja existe');
		}else{
			var novoUsuario = new Usuario();
			novoUsuario.nome= nome;
			novoUsuario.senha = novoUsuario.gerarSenha(senha);
			novoUsuario.token = novoUsuario.gerarToken(nome, senha);
			novoUsuario.save(function(erro, usuario){
				if(erro){
					callback('deu erro');
				}else{
					callback(usuario);
				}
			})
		}
	})
}

exports.login = function(nome, senha, callback){
	Usuario.findOne({'nome':nome}, function(erro, usuario){
		if(erro){
			callback('Deu erro');
		}else if(usuario){
			if(usuario.validarSenha(senha)){
				callback(usuario.token);
			}else{
				callback('Senha incorreta');
			}
		}else{
			callback('Usuario inexistente');
		}
	})
	
}


exports.list = function(token, callback){
	Usuario.findOne({'token':token}, function(erro, usuario){
		if(erro){
			callback('Deu erro');
		}else if(usuario){
			callback({'nome':usuario.nome});
		}else{
			callback('Usuario não encontrado');
		}
	})
}