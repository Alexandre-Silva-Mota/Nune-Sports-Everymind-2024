const apiUrl = '/api/products';

// Função para atualizar a lista de produtos
async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos produtos

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.nome}</td>
            <td>${product.codigo}</td>
            <td>${product.descricao}</td>
            <td>${product.preco.toFixed(2)}</td>
            <td>
                <button onclick="editProduct(${product.id}, '${product.nome}', '${product.codigo}', '${product.descricao}', ${product.preco})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Deletar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para adicionar ou editar um produto
async function saveProduct(event) {
    event.preventDefault();

    const id = document.querySelector('#product-id').value;
    const nome = document.querySelector('#name').value;
    const codigo = document.querySelector('#code').value;
    const descricao = document.querySelector('#description').value;
    const preco = parseFloat(document.querySelector('#price').value);

    if (!validateCode(codigo)) {
        document.querySelector('#code-error').style.display = 'block';
        return;
    } else {
        document.querySelector('#code-error').style.display = 'none';
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, codigo, descricao, preco })
    });

    if (response.ok) {
        document.querySelector('#product-form').reset();
        document.querySelector('#product-id').value = '';
        fetchProducts(); // Atualiza a lista de produtos
    } else {
        alert('Erro ao salvar o produto.');
    }
}

// Função para validar o campo "Código"
function validateCode(codigo) {
    const codeErrorElement = document.querySelector('#code-error');
    if (!/^\d{4,}$/.test(codigo)) {
        codeErrorElement.textContent = 'O código deve ter no mínimo 4 caracteres numéricos.';
        return false;
    }
    codeErrorElement.textContent = '';
    return true;
}

// Função para editar um produto
function editProduct(id, nome, codigo, descricao, preco) {
    document.querySelector('#product-id').value = id;
    document.querySelector('#name').value = nome;
    document.querySelector('#code').value = codigo;
    document.querySelector('#description').value = descricao;
    document.querySelector('#price').value = preco.toFixed(2);
}

// Função para deletar um produto
async function deleteProduct(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchProducts(); // Atualiza a lista de produtos
    } else {
        alert('Erro ao deletar o produto.');
    }
}

// Função para mostrar ou esconder o tooltip
function toggleTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.classList.toggle('show');
}

// Inicializa a página
document.querySelector('#product-form').addEventListener('submit', saveProduct);
fetchProducts(); // Carrega os produtos ao carregar a página
