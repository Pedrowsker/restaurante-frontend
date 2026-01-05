const API_URL = 'https://restaurante-backend-tnnb.onrender.com';

const ativosDiv = document.getElementById('pedidos-ativos');
const historicoDiv = document.getElementById('pedidos-historico');

async function carregarPedidos() {
  try {
    const response = await fetch(`${API_URL}/pedidos`);
    const pedidos = await response.json();

    ativosDiv.innerHTML = '';
    historicoDiv.innerHTML = '';

    pedidos.forEach(pedido => {
      const pedidoDiv = document.createElement('div');
      pedidoDiv.className = 'pedido';

      let html = `
        <h3>Cliente: ${pedido.nome_cliente}</h3>
        <p>Status: <strong>${pedido.status}</strong></p>
        <div class="itens">
      `;

      pedido.itens.forEach(item => {
        html += `<div class="item">• ${item.quantidade}x ${item.produto}</div>`;
      });

      html += `</div><div class="acoes">`;

      if (pedido.status === 'Pronto') {
        html += `
          <button class="voltar" onclick="alterarStatus(${pedido.id}, 'Em preparo')">
            Voltar para preparo
          </button>
        `;
        pedidoDiv.classList.add('pronto');
        pedidoDiv.innerHTML = html + `</div>`;
        historicoDiv.appendChild(pedidoDiv);
      } else {
        html += `
          <button onclick="alterarStatus(${pedido.id}, 'Em preparo')">Em preparo</button>
          <button class="pronto" onclick="alterarStatus(${pedido.id}, 'Pronto')">Pronto</button>
        `;
        pedidoDiv.innerHTML = html + `</div>`;
        ativosDiv.appendChild(pedidoDiv);
      }
    });

  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
  }
}

async function alterarStatus(id, status) {
  await fetch(`${API_URL}/pedido/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });

  carregarPedidos();
}

async function limparPedidos() {
  if (!confirm('Deseja apagar TODOS os pedidos?')) return;

  await fetch(`${API_URL}/pedidos`, { method: 'DELETE' });
  carregarPedidos();
}


carregarPedidos();
setInterval(carregarPedidos, 5000);
