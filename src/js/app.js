// DOM elements
var addButton = document.getElementById('add');
var removeAllButton = document.getElementById('removeAll');
var inputField = document.getElementById('text');
var list = document.getElementById("list");

// Data store
var todoItems = JSON.parse(localStorage.getItem("thingsToDo")) || {};

function saveToLocalStorage() {
    // Store the objects into local storage.

    localStorage.setItem("thingsToDo", JSON.stringify(todoItems));
    console.log(localStorage.getItem("thingsToDo"));
}

// Add new items to array
function addTodoItem(newItem) {
    var uniqueId = Date.now();

    todoItems[uniqueId] = (
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

// Mark item as completed
function markItemCompleted(key) {

    console.log('Marked ' + key + ' as done!');

    todoItems[key].completed = true;

    saveToLocalStorage();
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


function createTaskName(article, todoItem, key) {
    // Task name
    var taskName = document.createElement('h1');
    taskName.textContent = todoItem.text;

    taskName.addEventListener('click', function() {
        engageEditMode(taskName);

        taskName.addEventListener('blur', function() {
            saveEdit(taskName, key);
        });
    });

    article.appendChild(taskName);
}


function createDeleteButton(itemTools, key) {
    // Delete button
    var deleteButton = document.createElement('span');
    deleteButton.className = 'remove-item';
    deleteButton.setAttribute('todo-item', key);
    deleteButton.textContent = 'X';

    deleteButton.addEventListener('click', function(){
        removeTodoItem(key);
    });

    itemTools.appendChild(deleteButton);
}

function createDoneButton(itemTools, key) {
    // Done button
    var doneButton = document.createElement('span');
    doneButton.className = 'complete-item';
    doneButton.setAttribute('todo-item', key);
    doneButton.textContent = 'V';

    doneButton.addEventListener('click', function(){

        markItemCompleted(key);
    });

    itemTools.appendChild(doneButton);
}


function createTaskTools(article, key) {
    // Item tools wrapper
    var itemTools = document.createElement('span');
    itemTools.className = 'item-tools';

    createDeleteButton(itemTools, key);
    createDoneButton(itemTools, key);

    article.appendChild(itemTools);
}


function createTodoItem(todoItem, key) {

    var article = document.createElement('article');

    if(todoItem.completed !== undefined && todoItem.completed !== '' && todoItem.completed === true) {
        article.className = 'completed';
    }

    createTaskName(article, todoItem, key);
    createTaskTools(article, key);

    return article;
}


function engageEditMode(taskName) {
    taskName.setAttribute('contenteditable', 'true');
}


function saveEdit(taskName, key) {
    console.log('saved ' + key);

    todoItems[key] = (
        {
            text: taskName.textContent
        }
    );

    saveToLocalStorage();
    appendTodoItems();
}


function appendTodoItems() {
    var taskWrapper = document.createElement('div');

    if(Object.keys(todoItems).length > 0) {
        Object.keys(todoItems).forEach((key) => taskWrapper.appendChild(createTodoItem(todoItems[key], key)));
    }
    else {
        taskWrapper.innerText = 'Looks like you have nothing to do today! Go grab a Coke :-)';
    }

    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    list.appendChild(taskWrapper);
}

appendTodoItems();
