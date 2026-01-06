const params = new URLSearchParams(window.location.search);
const pedidoId = params.get('id');

const API_URL = 'https://restaurante-backend-tnnb.onrender.com';

const clienteSpan = document.getElementById('cliente');
const statusSpan = document.getElementById('status');
const itensDiv = document.getElementById('itens');
const mensagemPronto = document.getElementById('mensagem-pronto');

async function carregarPedido() {
  try {
    const response = await fetch(`${API_URL}/pedido/${pedidoId}`);
    const pedido = await response.json();

    clienteSpan.innerText = pedido.nome_cliente;

    statusSpan.innerText = pedido.status;
    statusSpan.className = `status ${pedido.status.replace(' ', '-')}`;

    mensagemPronto.style.display = pedido.status === 'Pronto' ? 'block' : 'none';

    itensDiv.innerHTML = '';
    pedido.itens.forEach(item => {
      const div = document.createElement('div');
      div.innerText = `${item.quantidade}x ${item.produto}`;
      itensDiv.appendChild(div);
    });

  } catch (error) {
    console.error('Erro ao carregar pedido:', error);
  }
}

carregarPedido();
setInterval(carregarPedido, 3000);
