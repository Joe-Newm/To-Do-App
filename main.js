const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value")

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
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

    const delBtn = document.querySelectorAll(".delete")
    delBtn.forEach(button => {
        button.onclick = () => {
            button.parentNode.parentNode.remove();
        }
    })

}
addBtn.addEventListener("click", addTask)



const edit = (event) => {

}



