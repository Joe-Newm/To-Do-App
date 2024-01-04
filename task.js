const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const completedTasksContainer = document.querySelector("#tasks-completed");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value");
const plural = document.querySelector(".plural-value");
let taskDiv = document.querySelectorAll(".task");
let taskarray = Array.from(taskDiv);
let taskHTMLArray = taskarray.map(taskDiv => taskDiv.innerHTML )

let storedtasks = JSON.parse(localStorage.getItem("tasks"));
let storedCompletedTasks = JSON.parse(localStorage.getItem("completed-tasks"))
let taskItemStorage = []
let taskCount = taskItemStorage.length;
let completedTasks = []

// call when adding tasks to save to local storage
const saveToLocalStorage = () => {
  gatherTasks();
  localStorage.setItem("tasks", JSON.stringify(taskItemStorage));
  localStorage.setItem("completed-tasks", JSON.stringify(completedTasks))
  updateTaskCount()
};

// function to gather task divs
const gatherTasks = () => {
  localStorage.removeItem("tasks")
  taskItemStorage = []
  let taskDiv = document.querySelectorAll(".task");
  let taskarray = Array.from(taskDiv);
  taskarray.forEach((taskDiv) => {
    taskItemStorage.push(taskDiv.outerHTML)
  })
}

// function that attches edit and delete button event listener to added task
const attachEventListeners = () => {
  const delBtn = document.querySelectorAll(".delete");
  delBtn.forEach((button, index) => {
    button.onclick = () => {
      if (button.parentElement.parentElement.classList.contains("completed-task")) {
        completedTasks.splice(completedTasks.findIndex((task) => task === button.parentElement.outerHTML), 1 );
      } else {
        taskItemStorage.splice(taskItemStorage.findIndex((task) => task === button.parentElement.outerHTML), 1 );
      }
      button.parentElement.parentElement.remove();
      saveToLocalStorage();
      updateTaskCount();  
    };
  });
  // adds the event listener for the edit buttons on each task
  const editBtn = document.querySelectorAll(".edit");
  editBtn.forEach((button) => {
    button.onclick = () => {
      let text = button.parentElement.parentElement.querySelector(".taskname");
      let inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.value = text.innerText;
      text.parentNode.replaceChild(inputElement, text);
      inputElement.focus()
      inputElement.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
          text.innerText = inputElement.value;
          inputElement.parentNode.replaceChild(text, inputElement);
          saveToLocalStorage();
        }
      })
    };
  });
  // task checkbox functionality
let checkboxes = document.querySelectorAll(".task-check")

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.remove("task");
    checkbox.parentElement.classList.add("completed-task");
    checkbox.setAttribute("checked", "")
    completedTasks.push(checkbox.parentElement.outerHTML);
    taskItemStorage.splice(  (checkbox.parentElement.outerHTML), 1 );
    saveToLocalStorage();
    updateTaskCount();  
    tasksContainer.innerHTML = taskItemStorage.join("");
    completedTasksContainer.innerHTML = completedTasks.join("");
    attachEventListeners();
    
    console.log(completedTasks)
  }

  if (checkbox.checked === false) {
    checkbox.parentElement.classList.remove("completed-task");
    checkbox.parentElement.classList.add("task");
    checkbox.removeAttribute("checked");
    taskItemStorage.push(checkbox.parentElement.innerHTML);
    completedTasks.splice(  (checkbox.parentElement.outerHTML), 1 );
    saveToLocalStorage();
    updateTaskCount();
    tasksContainer.innerHTML = taskItemStorage.join("");
    completedTasksContainer.innerHTML = completedTasks.join("");
    attachEventListeners()  
  }
  
})
})
};

// takes the tasks stored in the local storage and puts them back on the screen when loading website
document.addEventListener("DOMContentLoaded", () => {
  if (Array.isArray(storedtasks)) {
    taskItemStorage = taskItemStorage.concat(storedtasks);
  }
  if (Array.isArray(storedCompletedTasks)) {
    completedTasks = completedTasks.concat(storedCompletedTasks);
  }
  tasksContainer.innerHTML = taskItemStorage.join("");
  completedTasksContainer.innerHTML = completedTasks.join("");
  attachEventListeners();
  updateTaskCount()
});

// changes the plural form of the word task
const displayCount = (taskCount) => {
  taskCount = taskItemStorage.length;
  countValue.innerText = taskCount;
  if (taskCount > 1 || taskCount == 0) {
    plural.innerText = "s";
  } else {
    plural.innerText = "";
  }
};
// updates the task count, should be called when adding or deleting tasks
const updateTaskCount = () => {
  taskCount = taskItemStorage.length;
  displayCount(taskCount);
};

// function for adding new task
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
            <button class="edit"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 26 26">
            <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z"></path>
            </svg></button>
            <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
            <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
            </svg></button>
        </div>
    </div>`;

  taskItemStorage.push(taskHTML);
  tasksContainer.innerHTML = taskItemStorage.join("");
  newTaskInput.value = "";
  updateTaskCount();
  attachEventListeners();
  saveToLocalStorage();
};

// event listener for the add button or pressing Enter
addBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
   
  }
})






// checkbox.addEventListener("change", () => {
//   if (checkbox.checked) {
//     checkbox.parentElement.parentElement.
//   }
//   else {

//   }
// })

