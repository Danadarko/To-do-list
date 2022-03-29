let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo'),
    deleteAll = document.querySelector('.delete'),
    deleteLast = document.querySelector('.delete-last'),
    deleteIcon = document.querySelector('.delete_icon'),
    form = document.querySelector('.todo_list'),
    countDiv = document.querySelector('.counter'),
    countCompleted = document.querySelector('.counter__completed'),
    allTasks = document.querySelector('.display-all'),
    completedTasks = document.querySelector('.display-completed');

let todoList = [];
let completedCounter = 0;
let idCounter = 0;
if (localStorage.getItem('todos')) {
    getName();
    displayMessages();
}

addButton.addEventListener('click', function() {
    if (!addMessage.value.trim()) return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
        date: new Date(),
        id: idCounter++,
    }
    todoList.push(newTodo);
    displayMessages();
    setName();
    addMessage.value = '';
    countDiv.innerHTML = todoList.length;


});

function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach((item) => {
        displayMessage += `
        <li data-item=${item.id}>
            <input type='checkbox'id='item_${item.id}' ${item.checked ? 'checked' : ''}>
            <label for='item_${item.id}' class="${item.important ? 'important' : ''}">${item.todo}</label>
            <button class='delete_icon' data-id=${item.id}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="27" viewBox="0 0 24 27" width="24"><path d="M18.6 25.1H5.39999C4.19999 25.1 3.10001 24.0958 3.10001 22.7904V4.11255H20.8V22.7904C20.8 24.0958 19.8 25.1 18.6 25.1Z" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M1.3 4.21295H22.7" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M15.8 4.21295H8.2V3.61044C8.2 2.20458 9.3 1.09998 10.7 1.09998H13.2C14.6 1.09998 15.7 2.20458 15.7 3.61044V4.21295H15.8Z" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M8.2 7.92841V21.2841" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M12 7.92841V21.2841" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/><path d="M15.8 7.92841V21.2841" stroke="#4F4F4F" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/></svg>
            </button>
            <p>${item.date}</p>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
};

function setName() {
    let arrStr = JSON.stringify(todoList);
    localStorage.setItem('todos', arrStr);

};

function getName() {
    let todoListStr = localStorage.getItem('todos');
    let parsedTodoList = JSON.parse(todoListStr);
    todoList = parsedTodoList;
};



addMessage.addEventListener('keypress', function(event) {
    if (event.charCode === 13) {
        if (!addMessage.value) return;
        let newTodo = {
            todo: addMessage.value,
            checked: false,
            important: false,
            date: new Date(),
            id: idCounter++,
        }
        todoList.push(newTodo);
        displayMessages();
        setName();
        addMessage.value = '';
        countDiv.innerHTML = todoList.length;
    }
});

deleteLast.addEventListener('click', function(event) {
    todoList.splice(-1, 1);
    displayMessages();
    setName();
    countDiv.innerHTML = todoList.length;
    countCompleted.innerHTML = completedCounter;
});

deleteAll.addEventListener('click', function(event) {
    todoList.splice(0, todoList.length);
    displayMessages();
    setName();
    countDiv.innerHTML = todoList.length;
    completedCounter = 0;
    countCompleted.innerHTML = completedCounter;
});

todo.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete_icon')) {
        let obj = document.querySelector(`[data-item='${e.target.dataset.id}']`);
        console.log(e.target.dataset.id);
        let removedObject = todoList.find(item => item.id == e.target.dataset.id);
        todoList = todoList.filter(item => item.id != e.target.dataset.id);
        displayMessages();
        setName();
        countDiv.innerHTML = todoList.length;
        if (removedObject.checked) {
            completedCounter--;
            countCompleted.innerHTML = completedCounter;
        }
    }
});


todo.addEventListener('change', function(event) {
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;
    todoList.forEach(item => {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            setName();
            if (item.checked) {
                completedCounter++;
            } else if (!item.checked) {
                completedCounter--;
            }
        }
        return item;
    });
    countCompleted.innerHTML = completedCounter;
});