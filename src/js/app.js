// DOM elements
var addButton = document.getElementById('add');
var removeAllButton = document.getElementById('removeAll');
var inputField = document.getElementById('text');
var list = document.getElementById("list");

// Data store
var todoItems = {};

function saveToLocalStorage() {
    // Store the objects into local storage.

    localStorage.setItem("thingsToDo", JSON.stringify(todoItems));
    console.log(localStorage.getItem("thingsToDo"));
}

// Get random number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Add new items to array
function addTodoItem(newItem) {
    todoItems[getRandomInt(1,200)] = (
        {
            text: newItem
        }
    );

    saveToLocalStorage();
    appendTodoItems();
}


// Remove items from array
function removeTodoItem(itemId) {

    delete todoItems[itemId];

    saveToLocalStorage();
    appendTodoItems();
}


// Edit items inline
function editTodoItem(itemId) {

    todoItems[itemId] = {
                id: 2,
                text: Blaat,
                completed: true
        };

    appendTodoItems();
}


// Mark item as completed
function markItemCompleted(article, itemId) {

    // article.className = 'completed';

    // todoItems.push({
    //     id: 2,
    //     text: 'Blaat',
    //     completed: false
    // })

    if(todoItems[itemId]) {
        todoItems[itemId].completed = false;
    }

    appendTodoItems();
}

function validateInput(inputValue) {
    if (inputValue !== '') {
        addTodoItem(inputValue);
    }
}

// Event listeners
addButton.addEventListener('click', function(){
    validateInput(inputField.value);
});

inputField.addEventListener('keypress', function(e){
    if(e && e.keyCode == 13) {
        validateInput(inputField.value);
    }
});


function createTodoItem(todoItem, key) {

    var article = document.createElement('article');

    if(todoItem.completed !== undefined && todoItem.completed !== '' && todoItem.completed === true) {
        article.className = 'completed';
    }

    // Task name
    var taskName = document.createElement('h1');
    taskName.textContent = todoItem.text;

    taskName.addEventListener('click', function() {
        engageEditMode(taskName);

        taskName.addEventListener('blur', function() {
            saveEdit(taskName);
        });
    });

    // Item tools wrapper
    var itemTools = document.createElement('span');
    itemTools.className = 'item-tools';

    // Delete button
    var deleteButton = document.createElement('span');
    deleteButton.className = 'remove-item';
    deleteButton.setAttribute('todo-item', key);
    deleteButton.textContent = 'X';

    deleteButton.addEventListener('click', function(){
        removeTodoItem(key);
    });

    // Done button
    var doneButton = document.createElement('span');
    doneButton.className = 'complete-item';
    doneButton.setAttribute('todo-item', key);
    doneButton.textContent = 'V';

    doneButton.addEventListener('click keyup', function(){

        markItemCompleted(article, key);
    });

    itemTools.appendChild(deleteButton);
    itemTools.appendChild(doneButton);

    article.appendChild(taskName);
    article.appendChild(itemTools);

    return article;
}


function engageEditMode(taskName) {
    taskName.setAttribute('contenteditable', 'true');
}

function saveEdit(taskName) {
    console.log('saved');
}

function appendTodoItems() {
    var article = document.createElement('div');

    thingsToDo = JSON.parse(localStorage.getItem("thingsToDo")) || todoItems;

    if(Object.keys(thingsToDo).length > 0) {
        Object.keys(thingsToDo).forEach((key) => article.appendChild(createTodoItem(thingsToDo[key], key)));
    }
    else {
        article.innerText = 'Looks like you have nothing to do today! Go grab a Coke :-)';
    }

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    list.appendChild(article);
}

appendTodoItems();
