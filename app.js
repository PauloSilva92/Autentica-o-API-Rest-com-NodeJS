var app = require('./config/app_config');
var db  = require('./config/db_config');
var User = require('./models/Produto');
var produtoController = require('./controllers/produtoController');
var produtos = require('./routes/produtoRouter');
var usuario = require('./routes/usuarioRouter');


app.get('/',function(req,res){
	res.end('Bem-vindo a API de Produtos')
});

//rotas de produtos
app.use('/produtos',produtos);
app.use('/usuarios',usuario);


