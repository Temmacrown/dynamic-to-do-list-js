document.addEventListener('DOMContentLoaded', function() {

    let tasksArray = [];
    
    //Select and store elements task-input, add-task-btn, task-list
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById('task-list');

    //create function to load old task
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasksArray = storedTasks;
        tasksArray.forEach(taskText => addTask(taskText, false)); // 'false' prevents resaving to storage
    }
    
    //create a function to addtask to list
    function addTask(taskText = taskInput.value.trim(), save = true) {

        if(!taskText) {
            alert('Please enter a task');
        }

        //create list element to append the task to
        const li = document.createElement('li');
        li.textContent = taskText;
        
        //create button to delete task
        const button = document.createElement('button');
        button.textContent = "Remove";
        button.classList.add("remove-btn");
        

        //set button to remove task when clicked
        button.addEventListener('click', function(){
            li.remove();
            tasksArray = tasksArray.filter(task => task !== taskText);
            localStorage.setItem("tasks", JSON.stringify(tasksArray));
        });

        //add button element to li
        li.appendChild(button);
        // adds li element to taskList
        taskList.appendChild(li);
        
        taskInput.value = ''; //Clear input

         if (save) {
            tasksArray.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasksArray));
        }
    }
 
    //add task with button click or keypress enter. 
    addButton.addEventListener('click', function(){
         addTask();
    });
    
    taskInput.addEventListener('keypress', function (event){
        if(event.key === "Enter"){
            addTask();
        }
    });

    loadTasks();
})
