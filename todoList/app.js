const form = document.querySelector(".todo_form")
const input = document.querySelector(".todo_input")
const todo_container= document.querySelector(".todo_container")
let deleteBtns;
let checkBoxes;
let editBtns;

const addHTML=(todo) =>{
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoLeft = document.createElement("div");
    todoLeft.classList.add("todo_left");

    const todoCheckhed = document.createElement("input")
    todoCheckhed.type="checkbox";
    todoCheckhed.checked=todo.isCompleted;
    todoCheckhed.classList.add("todo_checkbox");

    const todoText = document.createElement("span");
    todoText.classList.add("todo");
    todoText.textContent=todo.text;

    todoLeft.appendChild(todoCheckhed);
    todoLeft.appendChild(todoText);

    const todoRight = document.createElement("div");
    todoRight.classList.add("todo_right");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo_delete");
    deleteBtn.textContent="Delete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("todo_edit");
    editBtn.textContent="Edit";

    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todo_container.appendChild(todoDiv);

}

const startConf = () => { //sayfa çalıstıgı an çalısır
    const todos= JSON.parse(localStorage.getItem("todos"));
    if(!todos){
        localStorage.setItem("todos", JSON.stringify([]));
    } else{
        todos.forEach(todo => {
            addHTML(todo);
        });
        deleteBtns=document.querySelectorAll(".todo_delete");
        checkBoxes=document.querySelectorAll(".todo_checkbox");
        editBtns=document.querySelectorAll(".todo_edit"); 
    }
}
startConf();

const addTodo = (e) => {
    e.preventDefault();
    
    inputVal= input.value;

    const todo = {
        text: inputVal, isCompleted: false,
    };

    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    addHTML(todo);
    
    form.reset();

}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
   
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos= todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));

    todo.remove();
}

const completeTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
   
    let todos = JSON.parse(localStorage.getItem("todos"));
    
    todos.forEach(td => {
        if(td.text === text) td.isCompleted = !td.isCompleted
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    todo.remove();
}

const editTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;
   
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos= todos.filter(td => td.text != text);
    localStorage.setItem("todos", JSON.stringify(todos));

    todo.remove();

    input.value= text;
}

form.addEventListener("submit", addTodo);
deleteBtns.forEach(btn => btn.addEventListener("click", deleteTodo));
checkBoxes.forEach(btn => btn.addEventListener("click", completeTodo));
editBtns.forEach(btn => btn.addEventListener("click", editTodo));

