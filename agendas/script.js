
const form = document.getElementById('formContato');
const tabela = document.getElementById('tabelaContatos');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome || !telefone || !email) {
      Swal.fire("Atenção!", "Preencha todos os campos!", "warning")
      return;
    }

    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    const existe = contatos.some(c =>
      c.telefone === telefone || c.email === email
    );

    if (existe) {
      Swal.fire("Ops!", "Já existe um contato com esse telefone ou e-mail!", "error");
      return;
    }

    contatos.push({ nome, telefone, email });

    localStorage.setItem('contatos', JSON.stringify(contatos));

    Swal.fire("Sucesso", "Contato salvo com sucesso!", "success");
    form.reset();
  });
}


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
        <td>${contato.email}</td>
        <td><button onclick="removerContato(${index})">Excluir</button></td>
      `;
      tbody.appendChild(tr);
    });
  }

  window.removerContato = function(index) {
    Swal.fire({
      title: "Tem certeza que deseja excluir?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then((result) => { //espera a resposta do usuario(promise)
      if (result.isConfirmed) {
        let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
        contatos.splice(index, 1);
        localStorage.setItem('contatos', JSON.stringify(contatos));
        carregarContatos();

        Swal.fire("Excluído!", "O contato foi removido com sucesso.", "success");
      }
  });

  }

  carregarContatos();
}
