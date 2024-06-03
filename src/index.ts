//type alias
type Tarefa = {
  descricao: string;
  categoria: string;
  data: string;
};

let listElement = document.querySelector("#app ul") as HTMLUListElement;
let taskInputElement = document.querySelector("#taskInput") as HTMLInputElement;
let categoryInputElement = document.querySelector("#categoryInput") as HTMLInputElement;
let dateInputElement = document.querySelector("#dateInput") as HTMLInputElement;
let addButtonElement = document.querySelector("#addButton") as HTMLElement;

let listaSalva: string | null = localStorage.getItem("@listagem_tarefas");
let tarefas: Tarefa[] = listaSalva !== null ? JSON.parse(listaSalva) : [];

function listarTarefas() {
  listElement.innerHTML = "";

  tarefas.forEach((item, index) => {
    let todoElement = document.createElement("li");

    let tarefaTextElement = document.createElement("span");
    //chamando a funcao para formatar a data
    tarefaTextElement.textContent = `${item.descricao} [${item.categoria}] - ${formatarData(item.data)}`;

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    linkElement.textContent = "Excluir";
    linkElement.style.marginLeft = "10px";
    linkElement.addEventListener("click", () => deletarTarefa(index));

    let editElement = document.createElement("a");
    editElement.setAttribute("href", "#");
    editElement.textContent = "Editar";
    editElement.style.marginLeft = "10px";
    editElement.addEventListener("click", () => editarTarefa(index));

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
  } else {
    let tarefaDigitada: string = taskInputElement.value;
    let categoriaDigitada: string = categoryInputElement.value || "Sem Categoria";
    let dataDigitada: string = dateInputElement.value || "Sem Data";

    let novaTarefa: Tarefa = {
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

function deletarTarefa(posicao: number) {
  tarefas.splice(posicao, 1);

  listarTarefas();
  salvarDados();
}

function editarTarefa(posicao: number) {
  let todoElement = listElement.children[posicao];
  let tarefaTextElement = todoElement.querySelector("span") as HTMLSpanElement;

  let inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = tarefas[posicao].descricao;

  let categoryInputElement = document.createElement("input");
  categoryInputElement.type = "text";
  categoryInputElement.value = tarefas[posicao].categoria;

  let dateInputElement = document.createElement("input");
  dateInputElement.type = "date";
  dateInputElement.value = tarefas[posicao].data;

  let saveElement = document.createElement("button");
  saveElement.textContent = "Salvar";
  saveElement.style.marginLeft = "10px";
  saveElement.addEventListener("click", () => {
    let novaDescricao = inputElement.value;
    let novaCategoria = categoryInputElement.value;
    let novaData = dateInputElement.value;
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

//funcao para exibir a data no padrao desejado
function formatarData(data: string): string {
  const partesData = data.split('-'); 
  const dia = partesData[2];
  const mes = partesData[1];
  const ano = partesData[0];

  return `${dia}/${mes}/${ano}`;
}

function salvarDados() {
  localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}
