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
            <button class="edit">edit</button>
            <button class="delete">delete</button>
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

