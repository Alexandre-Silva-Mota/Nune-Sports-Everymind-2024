const db = require('./db'); // Atualizado para o novo caminho

// Função para obter todos os produtos
const getAllProducts = (callback) => {
    db.all('SELECT * FROM produtos', [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
};

// Função para criar um novo produto
const createProduct = (product, callback) => {
    const { nome, codigo, descricao, preco } = product;
    const sql = 'INSERT INTO produtos (nome, codigo, descricao, preco) VALUES (?, ?, ?, ?)';
    db.run(sql, [nome, codigo, descricao, preco], function(err) {
        if (err) {
            return callback(err.message, null);
        }
        callback(null, { id: this.lastID, ...product });
    });
};

// Função para atualizar um produto existente
const updateProduct = (id, product, callback) => {
    const { nome, codigo, descricao, preco } = product;
    const sql = 'UPDATE produtos SET nome = ?, codigo = ?, descricao = ?, preco = ? WHERE id = ?';
    
    db.run(sql, [nome, codigo, descricao, preco, id], function(err) {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            return callback(err.message, null);
        }
        if (this.changes === 0) {
            return callback('Produto não encontrado.', null);
        }
        callback(null, { id, ...product });
    });
};


// Função para deletar um produto
const deleteProduct = (id, callback) => {
    const sql = 'DELETE FROM produtos WHERE id = ?';
    db.run(sql, [id], function(err) {
        if (err) {
            return callback(err.message, null);
        }
        callback(null, { id });
    });
};

// Função para obter um produto específico
const getProductById = (id, callback) => {
    const sql = 'SELECT * FROM produtos WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) {
            return callback(err.message, null);
        }
        if (!row) {
            return callback('Produto não encontrado.', null);
        }
        callback(null, row);
    });
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById // Exportando a nova função
};
