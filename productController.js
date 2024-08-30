const productModel = require('./productModels'); // Atualizado para o novo caminho

// Obter todos os produtos
exports.getAllProducts = (req, res) => {
    productModel.getAllProducts((rows) => {
        res.json(rows);
    });
};

// Criar um novo produto
exports.createProduct = (req, res) => {
    const product = req.body;
    productModel.createProduct(product, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json(result);
    });
};

// Atualizar um produto existente
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const product = req.body;

    productModel.updateProduct(id, product, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err);
            return res.status(400).json({ error: err });
        }
        res.json(result);
    });
};


// Deletar um produto
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    productModel.deleteProduct(id, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json(result);
    });
};

// Obter um produto específico
exports.getProductById = (req, res) => {
    const { id } = req.params;
    productModel.getProductById(id, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        res.json(row);
    });
};
