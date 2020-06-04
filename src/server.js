const express = require('express')
const server = express();

//buscando pasta public
server.use(express.static("public"));

//usando tamplate engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache:true
})

//rotas de envio de arquivos
server.get("/", (req, res)=>{
   return res.render("index.html")
})
server.get("/create-point", (req, res)=>{
   return res.render("create-point.html")
})
server.get("/search", (req, res)=>{
    return res.render("search-result.html")
})
server.listen(3000, ()=>{
    console.log("Servidor rodando...")
})
