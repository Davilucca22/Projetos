function SalvaLista(array){
    localStorage.setItem("Tarefas",JSON.stringify(array))
}

function recuperaDados(){
    const lista = localStorage.getItem("Tarefas")
    if(lista){
        const transform = JSON.parse(lista)
        array.push(...transform)
        criaTarefa(array)
    }
}

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

function criaTarefa(texto) {
    const lista_de_tarefas = document.querySelector('#lista_de_tarefas')
    const corpo_da_lista = document.querySelector('#corpo_da_lista')

    corpo_da_lista.innerHTML = ''

    for(let elemento in texto){
        const tarefa = document.createElement('li')
        tarefa.classList = 'tarefa'
        tarefa.id = elemento
        const paragrafo = document.createElement('p')
        paragrafo.innerText = texto[elemento]
        const edit_del = document.createElement('div')
        edit_del.id = "edit_del"
        const btn_del = document.createElement('input')
        btn_del.value = 'Del'
        btn_del.type = 'button'
        btn_del.id = 'deletar'
        const btn_edit = document.createElement('input')
        btn_edit.value = 'Edit'
        btn_edit.type = 'button'
        btn_edit.id = 'editar'
        const quebra_linha = document.createElement('hr')
        edit_del.appendChild(btn_edit)
        edit_del.appendChild(btn_del)
        paragrafo.appendChild(edit_del)
        tarefa.appendChild(paragrafo)
        tarefa.appendChild(quebra_linha)
        corpo_da_lista.appendChild(tarefa)
        lista_de_tarefas.appendChild(corpo_da_lista)
    }
    console.log(texto)

    return lista_de_tarefas

}



/**
* @function btn_editar essa funçao seleciona todos os botoes com a classe "editar" e adiciona um evento de clique que liga a janela modal 
*/

function btn_editar() {
    const btn_edit = document.querySelectorAll('#editar')

    btn_edit.forEach((element) => {
        element.addEventListener('click', () =>{
            console.log('clicou no editar')
            const pai = element.parentElement
            const avo = pai.parentElement
            const bisavo = avo.parentElement

            desligaModal(false)

            const input = document.querySelector('#texto')
            input.value = avo.innerText

            const ok = document.querySelector('#confirmar')
            ok.style.display = 'none'

            const Confirma_ediçao = document.querySelector('#edit_2')
            Confirma_ediçao.style.display = 'inline'

            Confirma_ediçao.addEventListener('click',() => {
                array.splice(bisavo.id,1,input.value)
                desligaModal(true)
                criaTarefa(array)
            })
        })
    })
}

function btn_deleta() {
    const btn_deletar = document.querySelectorAll('#deletar')

    //selectorAll retorna uma nodelist, para acessar os elementos desse nodelist usei o forEach e peguei os elementos pais do btn para apagar tudo de uma só vez
    btn_deletar.forEach((element) => {
        element.addEventListener('click', () => {
            const pai = element.parentElement
            const avo = pai.parentElement
            const bisavo = avo.parentElement

            array.splice(bisavo.id,1)
            criaTarefa(array)
        })
    })

    btn_editar()
}

const btn_add = document.querySelector('#btn-add').addEventListener('click', () => {
    desligaModal(false)

    //da foco ao input para digitar
    const input_texto = document.querySelector('#texto')
    input_texto.focus()

    //liga o btn de confirmar a tarefa
    const ok = document.querySelector('#confirmar')
    ok.style.display = 'inline'

    //esconde o btn de confirmar a ediçao
    const Confirma_ediçao = document.querySelector('#edit_2').addEventListener('click',() => {
        btn_editar()
        btn_deleta()
    })
    Confirma_ediçao.style.display = 'none'

})

const array = []

const btn_confirma = document.querySelector('#confirmar').addEventListener('click', () => {
    const input_texto = document.querySelector('#texto')

    if (input_texto.value !== '') {
        array.push(input_texto.value)
        criaTarefa(array)
        desligaModal(true)
        input_texto.value = ''
        SalvaLista(array)
    }
})

const btn_cancelar = document.querySelector('#cancelar').addEventListener('click', () => {
    desligaModal(true)
    const input_texto = document.querySelector('#texto')
    input_texto.value = ''
})


window.onload = desligaModal(true)
window.onload = recuperaDados()
window.onload = btn_editar()
window.onload = btn_deleta()

