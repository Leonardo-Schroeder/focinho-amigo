// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Modais
const modalButtons = document.querySelectorAll('.btn-novo');
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');

modalButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.modal);
    target.classList.add('active');
  });
});

closes.forEach(close => {
  close.addEventListener('click', () => {
    close.closest('.modal').classList.remove('active');
  });
});

window.addEventListener('click', e => {
  modals.forEach(modal => {
    if (e.target === modal) modal.classList.remove('active');
  });
});

// CRUD simples (exemplo local)
function adicionarLinha(tabelaId, dados) {
  const tabela = document.getElementById(tabelaId);
  const tr = document.createElement('tr');
  tr.innerHTML = `
    ${dados.map(d => `<td>${d}</td>`).join('')}
    <td>
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </td>
  `;
  tabela.appendChild(tr);
}

// Submissões de formulários
const forms = document.querySelectorAll('.admin-form');
forms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const idTabela = 'tabela-' + form.id.split('-')[1];
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], textarea');
    const dados = Array.from(inputs).map(i => i.value);
    adicionarLinha(idTabela, dados);
    form.reset();
    form.closest('.modal').classList.remove('active');
  });
});

// Excluir linha
document.body.addEventListener('click', e => {
  if (e.target.closest('.delete')) {
    e.target.closest('tr').remove();
  }
});
