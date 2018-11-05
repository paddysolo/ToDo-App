// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    //remove task using event delegation
    taskList.addEventListener('click', removeTask);
    //filter task
    filter.addEventListener('keyup', filterTask);
    //clear All Task
    clearBtn.addEventListener('click', clearTask);
    //add task when Dom is loaded
    document.addEventListener('DOMContentLoaded', getTask);
}

//getTask from local storage
function getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        let li = document.createElement('li');
        let link = document.createElement('a');
        li.classList.add('collection-item');
        li.appendChild(document.createTextNode(task));
        link.classList.add('delete-item', 'secondary-content');
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}


// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    //add task to local storage
    addTaskToLS(taskInput.value);
    // Clear input
    taskInput.value = '';



    e.preventDefault();
}
//add task to LS
function addTaskToLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    //add the task to ls
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//remove a Task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You sure you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}
//remove a Task From LS
function removeTaskFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all Task
function clearTask(e) {
    while (taskList.firstChild) {
        // taskList.firstChild.remove();
        taskList.removeChild(taskList.firstChild);
    }
    //clear LS
    clearLocalStorageCompletely();
}

function clearLocalStorageCompletely() {
    /**my implementation of local storage clear method */
    // let tasks;
    // if (localStorage.getItem('tasks') === null) {
    //     tasks = [];
    // } else {
    //     tasks = JSON.parse(localStorage.getItem('tasks'));
    // }
    // tasks = [];
    // localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.clear();
}

//filter task
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}