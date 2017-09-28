// DOM elements
var addButton = document.getElementById('add');
var removeAllButton = document.getElementById('removeAll');
var inputField = document.getElementById('text');
var list = document.getElementById("list");

// Data store
var todoItems = [];

function saveToLocalStorage() {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    var items = JSON.parse(localStorage.todoItems);
    console.log(localStorage.getItem("todoItems"));
}

// Get random number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Add new items to array
function addTodoItem(newItem) {
    todoItems.push(
        {
            id: getRandomInt(1,200),
            text: newItem
        }
    );

    saveToLocalStorage();
    appendTodoItems();
}


// Remove items from array
function removeTodoItem(itemId) {

    todoItems = todoItems.filter(function(todoItem) {
        if(todoItem.id !== itemId) {
            return todoItem;
        }
    })

    saveToLocalStorage();
    appendTodoItems();
}


// Edit items inline
function editTodoItem(itemId) {

    todoItems = todoItems.filter(function(todoItem) {
        if(todoItem.id !== itemId) {
            return todoItem;
        } else {
            todoItems.push({
                id: 2,
                text: Blaat,
                completed: true
            })
        }
    })

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


    for (var x = 0; x < todoItems.length; x++) {
        if (todoItems.hasOwnProperty('text')) {
            todoItems.text = false;
        }
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


function createTodoItem(todoItem) {

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
    deleteButton.setAttribute('todo-item', todoItem.id);
    deleteButton.textContent = 'X';

    deleteButton.addEventListener('click', function(){
        removeTodoItem(todoItem.id);
    });

    // Done button
    var doneButton = document.createElement('span');
    doneButton.className = 'complete-item';
    doneButton.setAttribute('todo-item', todoItem.id);
    doneButton.textContent = 'V';

    doneButton.addEventListener('click keyup', function(){

        markItemCompleted(article, todoItem.id);
    });

    itemTools.appendChild(deleteButton);
    itemTools.appendChild(doneButton);

    article.appendChild(taskName);
    article.appendChild(itemTools);

    return article;
}


function engageEditMode(taskName) {
    // taskName.replaceWith(textarea);
    taskName.setAttribute('contenteditable', 'true');
    // textarea.focus();
}

function saveEdit(taskName) {
    console.log('saved');
}

function appendTodoItems() {
    var article = document.createElement('div');

    todoItems = JSON.parse(localStorage.getItem("todoItems")) || todoItems;

    if(todoItems.length > 0) {
        todoItems.forEach(item => article.appendChild(createTodoItem(item)));
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
