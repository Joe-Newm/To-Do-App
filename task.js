const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value");
const plural = document.querySelector(".plural-value");
let storedtasks = JSON.parse(localStorage.getItem("storage"));
let taskItemStorage = [];
let taskCount = taskItemStorage.length;

// call when adding tasks to save to local storage
const saveToLocalStorage = () => {
  localStorage.setItem("storage", JSON.stringify(taskItemStorage));
};

// attach delete button event listener to added task
const attachEventListeners = () => {
  const delBtn = document.querySelectorAll(".delete");
  delBtn.forEach((button, index) => {
    button.onclick = () => {
      taskItemStorage.splice(index, 1);
      displayCount(taskCount);
      saveToLocalStorage();
      button.parentElement.parentElement.remove();
      updateTaskCount();
      attachEventListeners();
    };
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (Array.isArray(storedtasks)) {
    taskItemStorage = taskItemStorage.concat(storedtasks);
  }
  tasksContainer.insertAdjacentHTML("beforeend", taskItemStorage.join(""));
  attachEventListeners();
  displayCount(taskCount);
});

const displayCount = (taskCount) => {
  taskCount = taskItemStorage.length;
  countValue.innerText = taskCount;
  if (taskCount > 1 || taskCount == 0) {
    plural.innerText = "s";
  } else {
    plural.innerText = "";
  }
};
const updateTaskCount = () => {
  taskCount = taskItemStorage.length;
  displayCount(taskCount);
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const taskHTML = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <div class="btn-container">
    <button class="edit">edit</button>
    <button class="delete">delete</button>
    </div>
    </div>`;

  tasksContainer.insertAdjacentHTML("beforeend", taskHTML);
  newTaskInput.value = "";
  taskItemStorage.push(taskHTML);
  updateTaskCount();
  attachEventListeners();
  saveToLocalStorage();
};
addBtn.addEventListener("click", addTask);

const edit = (event) => {};
