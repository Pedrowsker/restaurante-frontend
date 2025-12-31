let carrinho = [];

const API_URL = 'https://SEU_BACKEND.onrender.com';

function adicionar(produto) {
  const item = carrinho.find(i => i.produto === produto);

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ produto, quantidade: 1 });
  }

  renderCarrinho();
}

function renderCarrinho() {
  const ul = document.getElementById('carrinho');
  ul.innerHTML = '';

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.produto} - ${item.quantidade}`;
    ul.appendChild(li);
  });
}

async function enviarPedido() {
  const nomeCliente = document.getElementById('nomeCliente').value;

  if (!nomeCliente || carrinho.length === 0) {
    alert('Preencha seu nome e escolha ao menos um item');
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/pedido`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_cliente: nomeCliente,
        itens: carrinho
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Erro');
    }

    window.location.href = `/cliente/?id=${dados.pedido_id}`;

  } catch (error) {
    alert('Erro ao enviar pedido');
  }
}
