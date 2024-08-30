const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Cria a tabela se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        codigo TEXT NOT NULL UNIQUE,
        descricao TEXT,
        preco REAL NOT NULL
    )`);
});

module.exports = db;
