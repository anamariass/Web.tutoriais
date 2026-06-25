const express = require('express');
const app = express();

const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const sequelize = require('./db');

const Produto = require('./models/Produto');
const Usuario = require('./models/Usuario');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync();


app.get('/exercicio4', async (req, res) => {

    await Produto.create({
        nome: 'Mouse',
        preco: 50
    });

    await Produto.create({
        nome: 'Teclado',
        preco: 120
    });

    await Produto.create({
        nome: 'Monitor',
        preco: 900
    });

    const produtos = await Produto.findAll();

    console.log(produtos);

    res.send('Produtos criados');
});

app.get('/exercicio5', async (req, res) => {

    const produto = await Produto.findByPk(1);

    console.log("Nome:", produto.nome);
    console.log("Preço:", produto.preco);

    res.send('Produto encontrado');
});

app.get('/exercicio6', async (req, res) => {

    const produto = await Produto.findByPk(1);

    produto.preco = 999;

    await produto.save();

    console.log("Preço atualizado");

    res.send('Produto atualizado');
});

app.get('/exercicio7', async (req, res) => {

    const produto = await Produto.findByPk(1);

    await produto.destroy();

    const produtos = await Produto.findAll();

    console.log(produtos);

    res.send('Produto removido');
});

app.get('/produtos', async (req, res) => {

    const produtos = await Produto.findAll();

    res.json(produtos);
});

app.post('/produtos', async (req, res) => {

    const { nome, preco } = req.body;

    await Produto.create({
        nome,
        preco
    });

    res.send('Produto cadastrado');
});

app.delete('/produtos/:id', async (req, res) => {

    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if(produto){
        await produto.destroy();
    }

    res.send('Produto removido');
});

app.get('/usuarios', async (req, res) => {

    const usuarios = await Usuario.findAll({
        raw: true
    });

    res.render('usuarios', {
        usuarios
    });
});

app.get('/usuarios/cadastrar', (req,res)=>{
    res.render('cadastrarUsuario');
});

app.post('/usuarios/add', async (req,res)=>{

    const { nome, email, idade } = req.body;

    await Usuario.create({
        nome,
        email,
        idade
    });

    res.redirect('/usuarios');
});

app.post('/usuarios/delete/:id', async (req,res)=>{

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(usuario){
        await usuario.destroy();
    }

    res.redirect('/usuarios');
});

app.get('/videos', async (req,res)=>{

    const videos = await Video.findAll({
        raw:true
    });

    res.render('videos',{
        videos
    });
});

app.get('/videos/add',(req,res)=>{
    res.render('cadastrarVideo');
});

app.post('/videos/add', async (req,res)=>{

    const { titulo, descricao, url } = req.body;

    await Video.create({
        titulo,
        descricao,
        url
    });

    res.redirect('/videos');
});

app.get('/videos/edit/:id', async (req,res)=>{

    const video = await Video.findByPk(req.params.id,{
        raw:true
    });

    res.render('editarVideo',{
        video
    });
});

app.post('/videos/edit', async (req,res)=>{

    const { id, titulo, descricao, url } = req.body;

    await Video.update(
        {
            titulo,
            descricao,
            url
        },
        {
            where:{ id }
        }
    );

    res.redirect('/videos');
});

app.post('/videos/delete/:id', async (req,res)=>{

    await Video.destroy({
        where:{
            id:req.params.id
        }
    });

    res.redirect('/videos');
});

app.listen(3000, () => {
    console.log("Servidor rodando");
});
