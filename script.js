document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    let tasks = [];

    // ✅ Load tasks from Local Storage
    function loadTasks() {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach(task => createTaskElement(task));
    }

    // ✅ Save tasks to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ✅ Add a new task
    function addTask(taskText) {
        if (taskText.trim() === '') return;
        createTaskElement(taskText);
        tasks.push(taskText);
        saveTasks();
    }

    // ✅ Create a task list item
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            tasks = tasks.filter(task => task !== taskText);
            saveTasks();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Event listeners
    addTaskBtn.addEventListener('click', function () {
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });

    clearAllBtn.addEventListener('click', function () {
        taskList.innerHTML = '';
        tasks = [];
        saveTasks();
    });

    // ✅ Initialize
    loadTasks();
});

