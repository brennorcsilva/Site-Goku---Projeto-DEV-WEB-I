// Função para lidar com o cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtém os valores dos campos
    var nome = document.getElementById('cadastroNome').value;
    var email = document.getElementById('cadastroEmail').value;
    var senha = document.getElementById('cadastroSenha').value;

    // Verifica se o email já está cadastrado
    if (localStorage.getItem(email)) {
        alert('Este email já está cadastrado.');
        return;
    }

    // Salva os dados no LocalStorage
    var usuario = {
        nome: nome,
        senha: senha
    };
    localStorage.setItem(email, JSON.stringify(usuario));

    alert('Cadastro realizado com sucesso!');
    document.getElementById('cadastroForm').reset(); // Limpa o formulário
});

// Função para lidar com o login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtém os valores dos campos
    var email = document.getElementById('loginEmail').value;
    var senha = document.getElementById('loginSenha').value;

    // Verifica se o usuário existe no LocalStorage
    var usuario = JSON.parse(localStorage.getItem(email));
    if (!usuario || usuario.senha !== senha) {
        alert('Email ou senha incorretos.');
        return;
    }

    alert('Login bem-sucedido! Bem-vindo, ' + usuario.nome + '!');
    document.getElementById('loginForm').reset(); // Limpa o formulário
});
// Evento de submissão do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    // Aqui você pode adicionar o código para fazer a autenticação do usuário
});


// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Criar um objeto representando o item
    var item = { nome: nome, preco: preco };
    
    // Recuperar o carrinho do LocalStorage ou inicializá-lo se for a primeira vez
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    // Adicionar o item ao carrinho
    carrinho.push(item);
    
    // Atualizar o HTML do modal de carrinho
    atualizarCarrinhoHTML(carrinho);
    
    // Armazenar o carrinho atualizado no LocalStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para atualizar o carrinho na página
function atualizarCarrinho() {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    var listaCarrinho = document.getElementById('cartItems');
    var total = 0;

    listaCarrinho.innerHTML = '';

    carrinho.forEach(function(item) {
        var li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <div>
                <h6 class="my-0">${item.nome}</h6>
                <small class="text-muted">R$ ${item.preco.toFixed(2)}</small>
            </div>
        `;
        listaCarrinho.appendChild(li);
        total += item.preco;
    });

    document.getElementById('cartTotal').textContent = 'Total: R$ ' + total.toFixed(2);
}

// Atualizar carrinho ao abrir o modal
$('#cartModal').on('show.bs.modal', function () {
    atualizarCarrinho();
});

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ nome: nome, preco: preco });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Evento de clique no botão Carrinho da NavBar
document.getElementById('cartBtn').addEventListener('click', function() {
    $('#cartModal').modal('show'); // Mostra o modal de carrinho
});
