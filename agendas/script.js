

const form = document.getElementById('formContato');
const tabela = document.getElementById('tabelaContatos');

// ======== PÁGINA DE CADASTRO ========
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome || !telefone) {
      alert("Preencha todos os campos!");
      return;
    }

    // Pegar os contatos salvos no localStorage
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    // Verificar se já existe nome ou telefone igual
    const existe = contatos.some(c => c.nome === nome || c.telefone === telefone);

    if (existe) {
      alert("Contato com mesmo nome ou telefone já cadastrado!");
      return;
    }

    // Adicionar novo contato
    contatos.push({ nome, telefone });

    // Salvar no localStorage
    localStorage.setItem('contatos', JSON.stringify(contatos));

    alert("Contato salvo com sucesso!");
    form.reset();
  });
}

// ======== PÁGINA DE HISTÓRICO ========
if (tabela) {
  function carregarContatos() {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    const tbody = tabela.querySelector('tbody');
    tbody.innerHTML = "";

    contatos.forEach((contato, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${contato.nome}</td>
        <td>${contato.telefone}</td>
        <td>${contato.mail}</td>
        <td><button onclick="removerContato(${index})">Excluir</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.removerContato = function(index) {
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    carregarContatos();
  };

  carregarContatos();
}