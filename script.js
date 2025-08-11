document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAllBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Load existing tasks
    tasks.forEach(task => createTaskElement(task));

    // Add task on button click
    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement(taskText);
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
        }
    });

    // Add task on Enter key
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Clear all tasks
    clearAllBtn.addEventListener('click', function () {
        taskList.innerHTML = '';
        tasks = [];
        localStorage.removeItem('tasks');
    });

    // Function to create task element
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }
});
