const express = require('express');
const router = express.Router();
const productController = require('./productController');

// Definições das rotas
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
// Adicionar rota para obter um produto específico
router.get('/:id', productController.getProductById);

module.exports = router;
