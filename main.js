const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value")
const plural = document.querySelector(".plural-value")
const delBtn = document.querySelectorAll(".delete")


let taskCount = 0;

let taskItemStorage = []


delBtn.forEach(button => {
    button.onclick = () => {
        button.parentNode.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount);
        localStorage.removeItem("storage")
        
    }
})

document.addEventListener("DOMContentLoaded", () => {
    let storedtasks = JSON.parse(localStorage.getItem("storage"))
    if (storedtasks) {
    tasksContainer.insertAdjacentHTML("beforeend", storedtasks);
    taskCount = taskItemStorage.length
    }
    displayCount(taskCount)
    newTaskInput.value = ""

})

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
    if (taskCount > 1 || taskCount == 0) {
        plural.innerText = "s"
    } else {
        plural.innerText = ""
    }

}


const addTask = () => {
    const taskName = newTaskInput.value.trim()
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200)
        return;
    } 

    const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <div class="btn-container">
    <button class="edit">edit</button>
    <button class="delete">delete</button>
    </div>
    </div>`

    tasksContainer.insertAdjacentHTML("beforeend", task);
    taskCount += 1;
    displayCount(taskCount)
    newTaskInput.value = ""
    taskItemStorage.push(task)

    //save to local storage?
    localStorage.setItem("storage", JSON.stringify(taskItemStorage.join(' ')))

    const delBtn = document.querySelectorAll(".delete")
    delBtn.forEach(button => {
        button.onclick = () => {
            button.parentNode.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
            localStorage.removeItem("storage")
            
        }
    })

}
addBtn.addEventListener("click", addTask)



const edit = (event) => {

}



