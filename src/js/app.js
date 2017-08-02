// DOM elements
var addButton = document.getElementById('add');
var removeAllButton = document.getElementById('removeAll');
var inputField = document.getElementById('text');
var removeItem = document.querySelector('[remove-item]');

// Data store
var todoItems = [
    {
        id: 0,
        text: 'Existing item'
    }
];

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

    appendTodoItems();
}

// Remove items from array
function removeTodoItem(itemId) {

    todoItems = todoItems.filter(function(todoItem) {
        if(todoItem.id !== itemId) {
            return todoItem;
        }
    })

    appendTodoItems();
}

// Edit items inline
function editTodoItem(itemId) {

    todoItems = todoItems.filter(function(todoItem) {
        if(todoItem.id !== itemId) {
            return todoItem;
        }
    })

    appendTodoItems();
}

// Event listeners
addButton.addEventListener('click', function(){
    var inputValue = inputField.value;

    if (inputValue !== '') {
        addTodoItem(inputValue);
    }
});

function createTodoItem(todoItem) {

    var article = document.createElement('article');

    // Task name
    var taskName = document.createElement('h1');
    taskName.textContent = todoItem.text;

    taskName.addEventListener('click', function(){
        var textarea = document.createElement('textarea');
        var currentContent = taskName.textContent;

        textarea.textContent = currentContent;
        this.replaceWith(textarea);;

        // editTodoItem(todoItem.id);
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

    // // Edit button
    // var editButton = document.createElement('span');
    // editButton.className = 'edit-item';
    // editButton.setAttribute('todo-item', todoItem.id);
    // editButton.textContent = 'Edit';
    //
    // editButton.addEventListener('click', function(){
    //     var editableText = $("<textarea />");
    //
    //     editTodoItem(todoItem.id);
    // });

    // itemTools.appendChild(editButton);
    itemTools.appendChild(deleteButton);

    article.appendChild(taskName);
    article.appendChild(itemTools);

    return article;
}

function appendTodoItems() {
    var el = document.getElementById("list");

    var article = document.createElement('div');

    todoItems.forEach(todoItem => article.appendChild(createTodoItem(todoItem)));

    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }

    el.appendChild(article);
}

appendTodoItems();
