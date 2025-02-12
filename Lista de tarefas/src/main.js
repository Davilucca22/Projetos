import { forEach } from 'core-js/core/array'
import './assets/css/style.css'

/**
 * @function desligaModal esta funçao liga e desliga a janela modal,coloque true ou false para ativar ou desativar a jenela modal
 * @param {boolean} liga
 */

function desligaModal(liga) {
    const janela_modal = document.querySelector('#janela_modal')

    if (liga === true) {
        janela_modal.style.display = 'none'
    } else if (liga === false) {
        janela_modal.style.display = 'flex' //display recebe flex pois este é o tipo de sua estilizaçao
    }
}

/**
 * @function criaTarefa cria e afilia cada tarefa ao conteudo principal
 * @param {string} texto 
 * */ 

function criaTarefa(texto){
    const lista_de_tarefas = document.querySelector('#lista_de_tarefas')
    const corpo_da_lista = document.querySelector('#corpo_da_lista')
    const tarefa = document.createElement('li')
    tarefa.classList = 'tarefa'
    const paragrafo = document.createElement('p')
    paragrafo.innerText = texto
    const edit_del = document.createElement('div')
    edit_del.id = "edit_del"
    const btn_edit = document.createElement('input')
    btn_edit.value = "Edit"
    btn_edit.type = 'button'
    btn_edit.classList = 'editar'
    const btn_del = document.createElement('input')
    btn_del.value = 'Del'
    btn_del.type = 'button'
    btn_del.id = 'deletar'
    const quebra_linha = document.createElement('hr')
    edit_del.appendChild(btn_edit)
    edit_del.appendChild(btn_del)
    tarefa.appendChild(paragrafo)
    tarefa.appendChild(edit_del)
    tarefa.appendChild(quebra_linha)
    corpo_da_lista.appendChild(tarefa)
    lista_de_tarefas.appendChild(corpo_da_lista)

    return lista_de_tarefas

}

const array = []

/**
* @function addArray adiciona a tarefa digitada a um array(usada posteriormente para salvar no localStorage)
* @param {string} elemento
*/

function addArray(elemento){

    array.push(elemento)

    return array
}

/**
* @function editaTarefa essa funçao seleciona todos os botoes com a classe "editar" e adiciona um evento de clique que liga a janela modal 
*/
function editaTarefa(){
   
}


const btn_add = document.querySelector('#btn-add').addEventListener('click', () => {
    desligaModal(false)
})

const input_texto = document.querySelector('#texto')


const btn_confirma = document.querySelector('#confirmar').addEventListener('click',() => {

    if(input_texto.value !== ''){
        const array_com_tarefas = addArray(input_texto.value)
        criaTarefa(input_texto.value)
        desligaModal(true)
        input_texto.value = ''
        console.log(array_com_tarefas)
    }
})

const btn_cancelar = document.querySelector('#cancelar').addEventListener('click',() => {
    desligaModal(true)
    input_texto.value = ''
})


window.onload = desligaModal(true)