// Get references to DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        // Create new list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn"); // ✅ Fixed missing classList.add

        // Add click event to remove button
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to list item
        li.appendChild(removeBtn);

        // Append list item to task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }
}

// Event listener for Add Task button
addTaskBtn.addEventListener("click", addTask);

// Optional: Add task when pressing Enter
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
