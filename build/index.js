"use strict";
var listElement = document.querySelector("#app ul");
var taskInputElement = document.querySelector("#taskInput");
var categoryInputElement = document.querySelector("#categoryInput");
var dateInputElement = document.querySelector("#dateInput");
var addButtonElement = document.querySelector("#addButton");
var listaSalva = localStorage.getItem("@listagem_tarefas");
var tarefas = listaSalva !== null ? JSON.parse(listaSalva) : [];
function listarTarefas() {
    listElement.innerHTML = "";
    tarefas.forEach(function (item, index) {
        var todoElement = document.createElement("li");
        var tarefaTextElement = document.createElement("span");
        tarefaTextElement.textContent = "".concat(item.descricao, " [").concat(item.categoria, "] - ").concat(formatarData(item.data));
        var linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        linkElement.textContent = "Excluir";
        linkElement.style.marginLeft = "10px";
        linkElement.addEventListener("click", function () { return deletarTarefa(index); });
        var editElement = document.createElement("a");
        editElement.setAttribute("href", "#");
        editElement.textContent = "Editar";
        editElement.style.marginLeft = "10px";
        editElement.addEventListener("click", function () { return editarTarefa(index); });
        todoElement.appendChild(tarefaTextElement);
        todoElement.appendChild(linkElement);
        todoElement.appendChild(editElement);
        listElement.appendChild(todoElement);
    });
}
listarTarefas();
function adicionarTarefa() {
    if (taskInputElement.value === "") {
        alert("Digite alguma tarefa!");
        return false;
    }
    else {
        var tarefaDigitada = taskInputElement.value;
        var categoriaDigitada = categoryInputElement.value || "Sem Categoria";
        var dataDigitada = dateInputElement.value || "Sem Data";
        var novaTarefa = {
            descricao: tarefaDigitada,
            categoria: categoriaDigitada,
            data: dataDigitada,
        };
        tarefas.push(novaTarefa);
        taskInputElement.value = "";
        categoryInputElement.value = "";
        dateInputElement.value = "";
        listarTarefas();
        salvarDados();
    }
}
addButtonElement.onclick = adicionarTarefa;
function deletarTarefa(posicao) {
    tarefas.splice(posicao, 1);
    listarTarefas();
    salvarDados();
}
function editarTarefa(posicao) {
    var todoElement = listElement.children[posicao];
    var tarefaTextElement = todoElement.querySelector("span");
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = tarefas[posicao].descricao;
    var categoryInputElement = document.createElement("input");
    categoryInputElement.type = "text";
    categoryInputElement.value = tarefas[posicao].categoria;
    var dateInputElement = document.createElement("input");
    dateInputElement.type = "date";
    dateInputElement.value = tarefas[posicao].data;
    var saveElement = document.createElement("button");
    saveElement.textContent = "Salvar";
    saveElement.style.marginLeft = "10px";
    saveElement.addEventListener("click", function () {
        var novaDescricao = inputElement.value;
        var novaCategoria = categoryInputElement.value;
        var novaData = dateInputElement.value;
        if (novaDescricao.trim() !== "") {
            tarefas[posicao].descricao = novaDescricao.trim();
            tarefas[posicao].categoria = novaCategoria.trim();
            tarefas[posicao].data = novaData.trim();
            listarTarefas();
            salvarDados();
        }
    });
    todoElement.innerHTML = "";
    todoElement.appendChild(inputElement);
    todoElement.appendChild(categoryInputElement);
    todoElement.appendChild(dateInputElement);
    todoElement.appendChild(saveElement);
}
function formatarData(data) {
    var partesData = data.split('-');
    var dia = partesData[2];
    var mes = partesData[1];
    var ano = partesData[0];
    return "".concat(dia, "/").concat(mes, "/").concat(ano);
}
function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}
