const btnInput = document.getElementById('texto-tarefa');
const olTarefas = document.getElementById('lista-tarefas');
const btnSumbit = document.getElementById('criar-tarefa');
const btnApaga = document.getElementById('apaga-tudo');
const btnRemoveF = document.getElementById('remover-finalizados');
const btnRemove = document.getElementById("remover-selecionado");
const btnSave = document.getElementById('salvar-tarefas');
const btnMoveUp = document.getElementById("mover-cima");
const btnMoveDown = document.getElementById("mover-baixo");

btnApaga.addEventListener('click', reset);
btnRemoveF.addEventListener('click', removeF);
btnSumbit.addEventListener('click', buscaInput);
btnRemove.addEventListener('click', apagaEsc);
btnSave.addEventListener('click', saveAll);
btnMoveUp.addEventListener('click',moveCima);
btnMoveDown.addEventListener('click',moveBaixo);

function buscaInput() {
  let valor = btnInput.value;
  let elLista = document.createElement('li');
  elLista.innerText = valor;
  elLista.addEventListener('click', mudaCor);
  elLista.addEventListener('dblclick', risca);
  elLista.classList.add("tarefa-li")
  olTarefas.appendChild(elLista);
  btnInput.value = '';
}

function mudaCor() {
  const filhos = document.getElementsByTagName('li');
  for (let i = 0; i < filhos.length; i += 1) {
    if (this === filhos[i]) {
      filhos[i].style.backgroundColor = 'lime';
    } else {
      filhos[i].style.backgroundColor = '';
    }
  }
}
function risca() {
    if(this.className != "tarefa-li completed"){
        this.classList.add('completed');
    }else{
        this.classList.remove('completed');
    }

}

function reset() {
    while (olTarefas.firstChild) {
        olTarefas.removeChild(olTarefas.firstChild);
    }
}

function removeF() {
  const filhos = document.querySelectorAll('li');
  for (let index = 0; index < filhos.length; index++) {
    if (filhos[index].className == 'tarefa-li completed') {
        olTarefas.removeChild(filhos[index])
        }
    }
  }

function apagaEsc(){
    console.log(this)
    const filhos = document.getElementsByTagName('li');
    for (let i = 0; i < filhos.length; i++) {
        console.log(filhos[i].style.backgroundColor)
      if (filhos[i].style.backgroundColor == "lime") {
        olTarefas.removeChild(filhos[i]);
      }
}
}

function saveAll() {
  let toStorge= [];
  let values = document.querySelectorAll('.tarefa-li');
  for (let index = 0; index < values.length; index++) {
    toStorge.push(values[index].innerHTML);
  }
  localStorage.setItem('items',JSON.stringify(toStorge));
}

function loadAll() {
  const valorSalvo = JSON.parse(localStorage.getItem('items'))
  for (let index = 0; index < valorSalvo.length; index++) {
    let el = document.createElement('li');
    el.innerText= valorSalvo[index]
    olTarefas.appendChild(el)
    
  }
}


function moveCima(){
  let elements = document.querySelectorAll('.tarefa-li');
  for(let i=0;i<elements.length;i++){
    if(elements[i].className == "tarefa-li" && elements[i].style.backgroundColor == "lime"){
      if(elements[i].previousElementSibling){
        elements[i].parentNode.insertBefore(elements[i], elements[i].previousElementSibling);
  }
    }
  }
}

function moveBaixo(){
  let elements = document.querySelectorAll('.tarefa-li');
  for(let i=0;i<elements.length;i++){
    if(elements[i].className == "tarefa-li" && elements[i].style.backgroundColor == "lime"){
      if(elements[i].nextElementSibling){
        elements[i].parentNode.insertBefore(elements[i].nextElementSibling,elements[i]);
  }
    }
  }
}




loadAll();