const taskInput = document.getElementById("task");
const clearButton = document.getElementById("clear-button");

clearButton.addEventListener("click", function () {
  taskInput.value = "";
});

const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;
  taskList.appendChild(taskItem);
  saveTasks();

  taskInput.value = "";
});

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

taskList.addEventListener("click", function (event) {
  const clickedItem = event.target;

  if (clickedItem.tagName === "LI") {
    clickedItem.classList.toggle("completed");
    saveTasks();
  }
});


function saveTasks() {
  const tasks = Array.from(taskList.children, function (item) {
    return {
      text: item.textContent,
      completed: item.classList.contains("completed"),
    };
  });

  localStorage.setItem("my-tasks", JSON.stringify(tasks));
}

const savedTasks = localStorage.getItem("my-tasks");

if (savedTasks !== null) {
  taskList.replaceChildren();

  for (const task of JSON.parse(savedTasks)) {
    const item = document.createElement("li");
    item.textContent = task.text;
    item.classList.toggle("completed", task.completed);
    taskList.appendChild(item);
  }
}

const deleteCompletedButton = document.getElementById("delete-completed");

deleteCompletedButton.addEventListener("click", function () {
  const completedTasks = taskList.querySelectorAll("li.completed");

  for (const task of completedTasks) {
    task.remove();
  }

  saveTasks();
});

function updateRemainingCount() {
  const remainingTasks = taskList.querySelectorAll("li:not(.completed)");
  const counter = document.getElementById("remaining-count");

  counter.textContent = remainingTasks.length;
}

updateRemainingCount();