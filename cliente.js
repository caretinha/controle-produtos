let nomeCliente = document.getElementById('nome');
let emailCliente = document.getElementById('email');
let cpfCliente = document.getElementById('cpf');
let telefoneCliente = document.getElementById('telefone');
let btnSalvar = document.getElementById('btnSalvar');
let clientes = [];
let indexEditado = null;

// Renderiza a tabela de clientes
function renderizarTabela() {
  let linha = '';
  clientes.forEach((c, index) => {
    linha += `
      <tr>
        <td>${c.codigo}</td>
        <td>${c.nome}</td>
        <td>${c.email}</td>
        <td>${c.cpf}</td>
        <td>${c.telefone}</td>
        <td>
          <button class="btn-edit btn-action" onclick="editarCliente(${index})">Editar</button>
          <button class="btn-remove btn-action" onclick="removerCliente(${index})">Remover</button>
        </td>
      </tr>
    `;
  });
  document.getElementById('clientes').innerHTML = linha;
}

// Adiciona um novo cliente
function addCliente() {
  if (!validarCampos()) return;
  clientes.push({
    codigo: clientes.length + 1,
    nome: nomeCliente.value.trim(),
    email: emailCliente.value.trim(),
    cpf: cpfCliente.value.trim(),
    telefone: telefoneCliente.value.trim()
  });
  renderizarTabela();
  limparCampos();
}

// Edita um cliente existente
function editarCliente(index) {
  const cliente = clientes[index];
  nomeCliente.value = cliente.nome;
  emailCliente.value = cliente.email;
  cpfCliente.value = cliente.cpf;
  telefoneCliente.value = cliente.telefone;
  indexEditado = index;
  btnSalvar.innerText = 'Atualizar Cliente';
  btnSalvar.onclick = atualizarCliente;
}

// Atualiza o cliente editado
function atualizarCliente() {
  if (!validarCampos()) return;
  clientes[indexEditado] = {
    ...clientes[indexEditado],
    nome: nomeCliente.value.trim(),
    email: emailCliente.value.trim(),
    cpf: cpfCliente.value.trim(),
    telefone: telefoneCliente.value.trim()
  };
  renderizarTabela();
  limparCampos();
  btnSalvar.innerText = 'Cadastrar Cliente';
  btnSalvar.onclick = addCliente;
  indexEditado = null;
}

// Remove um cliente
function removerCliente(index) {
  clientes.splice(index, 1);
  // Atualiza os códigos para manter sequência correta
  clientes.forEach((cliente, i) => cliente.codigo = i + 1);
  renderizarTabela();
  if (indexEditado === index) {
    limparCampos();
    btnSalvar.innerText = 'Cadastrar Cliente';
    btnSalvar.onclick = addCliente;
    indexEditado = null;
  }
}

// Limpa os campos do formulário
function limparCampos() {
  nomeCliente.value = '';
  emailCliente.value = '';
  cpfCliente.value = '';
  telefoneCliente.value = '';
  nomeCliente.focus();
}

// Valida se todos os campos estão preenchidos adequadamente
function validarCampos() {
  if (
    !nomeCliente.value.trim() ||
    !emailCliente.value.trim() ||
    !cpfCliente.value.trim() ||
    !telefoneCliente.value.trim()
  ) {
    alert('Por favor, preencha todos os campos.');
    return false;
  }
  // Pode incluir validações adicionais de formato aqui, por exemplo:
  // validação simples de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailCliente.value.trim())) {
    alert('Por favor, insira um email válido.');
    emailCliente.focus();
    return false;
  }
  // valida CPF básico (formato já definido no input html)
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfCliente.value.trim())) {
    alert('Por favor, insira um CPF no formato XXX.XXX.XXX-XX.');
    cpfCliente.focus();
    return false;
  }
  // valida telefone básico (formato já definido no input html)
  if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefoneCliente.value.trim())) {
    alert('Por favor, insira um telefone no formato (XX) XXXXX-XXXX.');
    telefoneCliente.focus();
    return false;
  }
  return true;
}

// Inicializa o botão salvar para adicionar cliente
btnSalvar.onclick = addCliente;
