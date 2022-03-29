const add = document.querySelector('.add');
const inputValue = document.querySelector('.input');
const container = document.querySelector('.list');
const deleteAll = document.querySelector('.delete-all');
const deleteLast = document.querySelector('.delete-last');

let goals = [];

const update = () => {
    goals = JSON.parse(localStorage.getItem('goals'));
    renderItem();
};

const updateLocalStorage = () => {
    localStorage.setItem('goals', JSON.stringify(goals));
}

const createTemplate = (obj) => {
    let div = document.createElement('div');
    div.classList.add('item');
    div.setAttribute('id', obj.id);

    let description = document.createElement('p');
    description.classList.add('title');
    description.textContent = obj.text;

    let inputCheckbox = document.createElement('input');
    inputCheckbox.classList.add('complete');
    inputCheckbox.setAttribute('type', 'checkbox');
    inputCheckbox.setAttribute('isChecked', obj.isChecked);
    inputCheckbox.checked = obj.isChecked;
    if (obj.isChecked) {
        div.classList.add("item-complete");
        description.classList.add('title-complete');
    } else {
        div.classList.remove("item-complete");
        description.classList.remove('title-complete');
    }

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete');
    deleteBtn.textContent = 'x';

    div.appendChild(inputCheckbox);
    div.appendChild(description);
    div.appendChild(deleteBtn);

    return div;
}

const renderItem = () => {
    container.innerHTML = '';

    goals.forEach((item) => {
        container.appendChild(createTemplate(item));
    });
};

const addItem = () => {

    if (!inputValue.value.trim()) {
        alert('Enter not empty value...');
        inputValue.value = '';
        return;
    } else {
        goals.push({
            id: Date.now(),
            isChecked: false,
            text: inputValue.value,
        });

        updateLocalStorage();
        inputValue.value = '';
        renderItem();
    }
};

const deleteItem = (e) => {

    if (e.target.classList.contains("delete")) {
        let parent = e.target.parentElement;
        let id = +parent.getAttribute("id");
        console.log(id);
        parent.remove();

        goals.forEach((item, index) => {
            if (id === item.id) {
                goals.splice(index, 1);
            }
        });

        updateLocalStorage();
    }
};

const changeItem = (e) => {
    let parent = e.target.parentElement;
    let id = +parent.getAttribute("id");
    let description = parent.querySelector('.title');

    if (e.target.checked) {
        parent.classList.add('item-complete');
        description.classList.add('title-complete');
    } else {
        parent.classList.remove('item-complete');
        description.classList.remove('title-complete');
    }

    goals.forEach((item, index) => {
        if (id === item.id) {
            item.isChecked = !item.isChecked;
        }
    });

    updateLocalStorage();
    console.log(goals);
};

const deleteAllItems = (e) => {
    goals = [];
    container.innerHTML = '';
    updateLocalStorage();
};

const deleteLastItem = (e) => {
    goals.pop();
    renderItem();
    updateLocalStorage();

};

add.addEventListener('click', addItem);
container.addEventListener('click', deleteItem);
container.addEventListener('change', changeItem);
deleteAll.addEventListener('click', deleteAllItems);
deleteLast.addEventListener('click', deleteLastItem);
window.addEventListener('load', update);