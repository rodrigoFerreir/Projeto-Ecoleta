const express = require('express')
const server = express();

//importando banco de dados
const db = require('./database/db')

//buscando pasta public
server.use(express.static("public"));

//habilitando o corpo da aplicação
server.use(express.urlencoded({
    extended: true
}))

//usando tamplate engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//rotas de envio de arquivos
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens
    ];
    console.log(values)
    const query = ` INSERT INTO places ( image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    function afterInsertData(error){
        if(error){
            console.log(error);
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso!");
        return res.render("/create-point", { saved: true });
    }
    db.run(query, values, afterInsertData);
})

server.get("/search", (req, res) => {
    //pegar os dados da tabela

    function afterReadData(error, rows) {
        if (error) {
            return console.log(error)
        }

        const total = rows.length
        //mostrar os dados da tabela na pagina da aplicação.
        return res.render("search-result.html", { places: rows, total })
    }
    db.all(`SELECT * FROM places`, afterReadData);
})
server.listen(3000, () => {
    console.log("Servidor rodando...")
})
