// app.js

// Task class definition
class Task {
    constructor(text) {
        this.id = crypto.randomUUID();
        this.text = text;
        this.completed = false;
    }
}

// Array to hold tasks
let tasks = [];

// DOM Elements
const taskForm = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Core functions

function addTask(text) {
    if (!text.trim()) return;
    const task = new Task(text.trim());
    tasks.push(task);
    renderTasks();
    saveToLocalStorage();
}

function editTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.text = newText.trim();
    renderTasks();
    saveToLocalStorage();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    saveToLocalStorage();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    renderTasks();
    saveToLocalStorage();
}

function renderTasks() {
    // Clear list
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add('completed');
        }

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.className = 'toggle-complete';

        // Text span
        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.flex = '1';
        span.style.marginLeft = '0.5rem';

        // Buttons container
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.gap = '0.5rem';

        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.className = 'edit-btn';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.className = 'delete-btn';

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnContainer);

        taskList.appendChild(li);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('todoTasks');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            // Ensure objects are instances of Task
            tasks = parsed.map(t => {
                const task = new Task(t.text);
                task.id = t.id;
                task.completed = t.completed;
                return task;
            });
        } catch (e) {
            console.error('Error parsing tasks from localStorage', e);
        }
    }
}

// Event listeners

// Add task via form submit
taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = newTaskInput.value;
    addTask(text);
    newTaskInput.value = '';
});

// Delegate clicks on task list
taskList.addEventListener('click', e => {
    const li = e.target.closest('li.task-item');
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.classList.contains('delete-btn')) {
        deleteTask(id);
    } else if (e.target.classList.contains('edit-btn')) {
        const newText = prompt('Edit task', li.querySelector('span').textContent);
        if (newText !== null) {
            editTask(id, newText);
        }
    } else if (e.target.type === 'checkbox') {
        toggleComplete(id);
    }
});

// On load
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderTasks();
});

