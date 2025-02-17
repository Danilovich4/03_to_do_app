const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');

// === PASO 1: AL CARGAR LA PÁGINA, LEEMOS LAS TAREAS DE LOCALSTORAGE ===
document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(function (taskText) {
        createTaskElement(taskText);
    });
    
    // Si no había tareas, mostramos el mensaje
    checkEmptyMessage();
});

// === PASO 2: ESCUCHAR EL ENVÍO DEL FORMULARIO ===
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, escribe una tarea');
        return;
    }

    createTaskElement(taskText);
    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
    emptyMessage.style.display = 'none';
});

// === FUNCIÓN: CREAR UNA TAREA (LI) ===
function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');

    // Marcar como completada
    taskTextElement.addEventListener('click', function () {
        taskItem.classList.toggle('completed');
    });

    // Eliminar tarea
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(taskItem);
        removeTaskFromLocalStorage(taskText);
        checkEmptyMessage();
    });

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// === FUNCIÓN: GUARDAR TAREA EN LOCALSTORAGE ===
function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// === FUNCIÓN: ELIMINAR TAREA DE LOCALSTORAGE ===
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(function (task) {
        return task !== taskText;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// === FUNCIÓN: MOSTRAR MENSAJE SI NO HAY TAREAS ===
function checkEmptyMessage() {
    if (taskList.children.length === 0) {
        emptyMessage.style.display = 'block';
    }
}
