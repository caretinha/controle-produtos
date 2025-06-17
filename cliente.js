let nomeCliente = document.getElementById('nome');
let emailCliente = document.getElementById('email');
let btnSalvar = document.getElementById('btnSalvar');
// Array para armazenar os clientes
let clientes = [];
let indexEditado = null;
// Função para renderizar a tabela de clientes
function renderizarTabela() {
    let linha = '';
    clientes.forEach((c, index) => {
        linha += `
            <tr>
                <td>${c.codigo}</td>
                <td>${c.nome}</td>
                <td>${c.email}</td>
                <td>
                    <button onclick="editarCliente(${index})" class="btn btn-md bg-warning">Editar</button>
                    <button onclick="removerCliente(${index})" class="btn btn-md bg-danger text-light">Remover</button>
                </td>
            </tr>
        `;
    });
    document.getElementById('clientes').innerHTML = linha;
}
// Função para adicionar um novo cliente
function addCliente() {
    // Verifica se os campos estão preenchidos
    if (nomeCliente.value === '' || emailCliente.value === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    // Adiciona um novo cliente ao array
    clientes.push({
        codigo: clientes.length + 1,
        nome: nomeCliente.value,
        email: emailCliente.value
    });
    // Renderiza a tabela e limpa os campos
    renderizarTabela();
    nomeCliente.value = '';
    emailCliente.value = '';
    nomeCliente.focus();
}
// Função para editar um cliente existente
function editarCliente(index) {
    const cliente = clientes[index];
    nomeCliente.value = cliente.nome;
    emailCliente.value = cliente.email;
    indexEditado = index;
    btnSalvar.innerText = 'Editar Cliente';
    btnSalvar.onclick = atualizarCliente;
}
// Função para atualizar os dados de um cliente
function atualizarCliente() {

</body>
</html>