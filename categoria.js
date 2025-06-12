let categorias = JSON.parse(localStorage.getItem('categorias')) || []
let editandoId = null

function salvarCategorias() {
    localStorage.setItem('categorias', JSON.stringify(categorias))
}

function listarCategorias() {
    const tabela = document.getElementById('categorias')
    tabela.innerHTML = ''

    categorias.forEach((categoria, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${categoria}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editarCategoria(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluirCategoria(${index})">Excluir</button>
                </td>
            </tr>
        `
    })
}

function addCategoria() {
    const input = document.getElementById('nmCategoria')
    const nome = input.value.trim()

    if (nome === '') {
        alert('Digite o nome da categoria.')
        return
    }

    if (editandoId === null) {
        categorias.push(nome)
    } else {
        categorias[editandoId] = nome
        editandoId = null
        document.getElementById('btnSalvar').textContent = 'Cadastrar categoria'
    }

    input.value = ''
    salvarCategorias()
    listarCategorias()
}

function editarCategoria(index) {
    const input = document.getElementById('nmCategoria')
    input.value = categorias[index]
    editandoId = index
    document.getElementById('btnSalvar').textContent = 'Salvar alteração'
}

function excluirCategoria(index) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
        categorias.splice(index, 1)
        salvarCategorias()
        listarCategorias()
    }
}

document.addEventListener('DOMContentLoaded', listarCategorias)
