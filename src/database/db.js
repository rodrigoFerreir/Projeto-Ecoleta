const sqlite3 = require("sqlite3").verbose()


const db = new sqlite3.Database("./src/database/database.db")

module.exports = db;

db.serialize(() => {
    //criando tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    //insrir dados na tabela
    const query = `
            INSERT INTO places (
                image, 
                name, 
                address, 
                address2, 
                state, 
                city, 
                items
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?
            );`
    const values = [
            "https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
            "Colectoria",
            "Guilherme Gemballa, Jardim América",
            "N°: 260",
            "Santa Catarina",
            "Rio do Sul",
            "Resíodos Eletrônicos, Lâmpadas"
    ];

    function afterInsertData(error){
        if(error){
            return console.log(error)
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
    }

    //db.run(query, values, afterInsertData)

    function afterDeleteData(error){
        if(error){
            return console.log(error)
        }
        console.log("Dados deletados com sucesso!")
    }
    
    //db.run(`DELETE FROM places WHERE id = ?`, [4], afterDeleteData)

    //ler dados na tabela.
    function afterReadData(error, rows){
        if(error){
            return console.log(error)
        }
        console.log("Dados da tabela:")
        console.log(rows)
    }

    //db.all(`SELECT * FROM places`, afterReadData);
})