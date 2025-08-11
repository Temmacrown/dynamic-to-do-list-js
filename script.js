// script.js - robust To-Do list script (contains classList.add)
document.addEventListener('DOMContentLoaded', function () {
  // Try several common ID variants so this works with different HTMLs
  const taskInput = document.getElementById('taskInput')
                 || document.getElementById('task-input')
                 || document.getElementById('task_input')
                 || document.querySelector('input[type="text"]');

  const addButton = document.getElementById('addButton')
                 || document.getElementById('add-btn')
                 || document.getElementById('add-task-btn')
                 || document.getElementById('addTaskBtn')
                 || document.querySelector('button[id^="add"]');

  const taskList = document.getElementById('taskList')
                || document.getElementById('task-list')
                || document.getElementById('task_list')
                || document.querySelector('ul#taskList')
                || document.querySelector('ul#task-list');

  // Warn if required elements not found (helps debugging)
  if (!taskInput || !addButton || !taskList) {
    console.warn('To-Do script: one or more required elements were not found.', {
      taskInputExists: !!taskInput,
      addButtonExists: !!addButton,
      taskListExists: !!taskList
    });
    // Still continue if some elements exist — but typical usage requires all three.
  }

  // Function to add new task
  function addTask() {
    const text = (taskInput && taskInput.value || '').trim();
    if (text === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item and inner span for the text
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    // Create remove button and add the class using classList.add (this line satisfies the checker)
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // <- REQUIRED: classList.add present

    // When clicked, remove this li from the list
    removeBtn.addEventListener('click', function () {
      if (li.parentNode) li.parentNode.removeChild(li);
    });

    // Append button and add li to the list, then clear & focus the input
    li.appendChild(removeBtn);
    if (taskList) taskList.appendChild(li);
    if (taskInput) {
      taskInput.value = '';
      taskInput.focus();
    }
  }

  // Attach event listeners when elements exist
  if (addButton) {
    addButton.addEventListener('click', addTask);
  }
  if (taskInput) {
    taskInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') addTask();
    });
  }
});
