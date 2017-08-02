// DOM elements
var addButton = document.getElementById('add');
var removeAllButton = document.getElementById('removeAll');
var inputField = document.getElementById('text');
var removeItem = document.getElementsByClassName('remove-item');

// Data store
var todoItems = [
    {
        id: 0,
        text: 'Existing item'
    }
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function addTodoItem(newItem) {
    todoItems.push(
        {
            id: getRandomInt(1,200),
            text: newItem
        }
    );
    printTasks();
}

function removeTodoItem(removeItem) {
    todoItems.remove({text: removeItem});
    printTasks();
}

// Event listeners
addButton.addEventListener('click', function(){
    var inputValue = inputField.value;

    if (inputValue !== null || inputValue !== undefined || inputValue !== '') {
        addTodoItem(inputValue);
    }
});

// removeAllButton.addEventListener('click', function(){
//     var inputValue = removeAllButton.value;
//
//     if (inputValue !== null || inputValue !== undefined || inputValue !== '') {
//         removeTodoItem(inputValue);
//     }
// });

// removeItem.addEventListener('click', function(){
//     var itemId = removeItem.dataset.todoItem;
//
//     if (itemId !== null || itemId !== undefined || itemId !== '') {
//         removeTodoItem(itemId);
//     }
// });

var removeIndex = array.map(function(item) { return item.id; })
                .indexOf("abc");

~removeIndex && array.splice(removeIndex, 1);

function itemTools(id) {
    return (
        `<span class="item-tools">
            <span class="remove-item" todo-item="${id}">X</span>
        </span>`
    );
}

function printTasks() {
    var el = document.getElementById("list");

    var list = todoItems.map(todoItem => (
        `<article id="${todoItem.id}">
            <h1>${todoItem.text}</h1>
            ${itemTools(todoItem.id)}
        </article>`
    )).join(" ");

    el.innerHTML = list;
}

printTasks();
