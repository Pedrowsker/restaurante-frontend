const API_URL = 'https://SEU_BACKEND.onrender.com';
const pedidosDiv = document.getElementById('pedidos');

async function carregarPedidos() {
  try {
    const response = await fetch(`${API_URL}/pedidos`);
    const pedidos = await response.json();

    pedidosDiv.innerHTML = '';

    pedidos
      .filter(pedido => pedido.status !== 'Pronto')
      .forEach(pedido => {

        const pedidoDiv = document.createElement('div');
        pedidoDiv.className = 'pedido';

        let html = `
          <h2>Cliente: ${pedido.nome_cliente}</h2>
          <p>Status: <strong>${pedido.status}</strong></p>
          <div class="itens">
        `;

        pedido.itens.forEach(item => {
          html += `<div class="item">• ${item.quantidade}x ${item.produto}</div>`;
        });

        html += `
          </div>
          <div class="acoes">
            <button onclick="alterarStatus(${pedido.id}, 'Em preparo')">Em preparo</button>
            <button onclick="alterarStatus(${pedido.id}, 'Pronto')">Pronto</button>
          </div>
        `;

        pedidoDiv.innerHTML = html;
        pedidosDiv.appendChild(pedidoDiv);
      });

  } catch (error) {
    console.error('Erro ao carregar pedidos:', error);
  }
}

async function alterarStatus(id, status) {
  try {
    const response = await fetch(`${API_URL}/pedido/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar status');
    }

    carregarPedidos();

  } catch (error) {
    console.error(error);
  }
}

carregarPedidos();
setInterval(carregarPedidos, 5000);
