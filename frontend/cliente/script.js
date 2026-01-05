const params = new URLSearchParams(window.location.search);
const pedidoId = params.get('id');
const codigo = params.get('codigo');

const API_URL = 'https://restaurante-backend-tnnb.onrender.com';

const clienteSpan = document.getElementById('cliente');
const statusSpan = document.getElementById('status');
const itensDiv = document.getElementById('itens');
const mensagemPronto = document.getElementById('mensagem-pronto');
const codigoSpan = document.getElementById('codigo-pedido');
const btnCopiar = document.getElementById('copiar-codigo');

async function carregarPedido() {
  try {
    let url;

    if (pedidoId) {
      url = `${API_URL}/pedido/${pedidoId}`;
    } else if (codigo) {
      url = `${API_URL}/pedido/codigo/${codigo}`;
    } else {
      return;
    }

    const response = await fetch(url);
    const pedido = await response.json();

    if (!response.ok) {
      throw new Error(pedido.erro || 'Pedido não encontrado');
    }

    clienteSpan.innerText = pedido.nome_cliente;

    statusSpan.innerText = pedido.status;
    statusSpan.className = `status ${pedido.status.replace(' ', '-')}`;

    mensagemPronto.style.display = pedido.status === 'Pronto' ? 'block' : 'none';

    codigoSpan.innerText = pedido.codigo;

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

// copiar código
btnCopiar.addEventListener('click', () => {
  navigator.clipboard.writeText(codigoSpan.innerText);
  btnCopiar.innerText = 'Copiado!';
  setTimeout(() => {
    btnCopiar.innerText = 'Copiar código';
  }, 2000);
});

carregarPedido();
setInterval(carregarPedido, 3000);
