const taskInput = document.querySelector("#task-input");
const importanceCheck = document.querySelector("#importance");
const importanceBtn = document.querySelector(".fas.fa-exclamation-circle");
const addTaskBtn = document.querySelector(".fas.fa-plus-circle");
const taskList = document.querySelector("#task-list");

window.addEventListener("load", populateList);
importanceBtn.addEventListener("click", toggleImportance);
addTaskBtn.addEventListener("click", addTask);

let taskArray = [];

function populateList() {
    if (retriveTaskStorage() !== null && retriveTaskStorage().length > 0) {
        taskArray = retriveTaskStorage();
        console.log(taskArray);
        taskArray.forEach(function(item) {
        createTask(item.title, item.important, item.complete);
    });
    }
}

function addTask() {
    if (taskInput.value === "") {
        alert("ADD TASK");
    } else {
        taskArray.push({
            title: taskInput.value,
            important: importanceCheck.checked,
            complete: false
        });
        uppdateTaskStorage();
        createTask(taskInput.value, importanceCheck.checked, false)
        taskList.scrollTop = taskList.scrollHeight;
    }
    
}

function createTask(title, important, isComplete) {

    // CREATE TASK ITEM
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (isComplete) {
        taskItem.classList.add("complete");
    }

    // CREATE TASK TITLE
    const taskTitle = document.createElement("h3");
    taskTitle.classList.add("task-title");
    if (important) {
        taskTitle.classList.add("important");
    }
    taskTitle.textContent = title;
    taskItem.appendChild(taskTitle);

    // CREATE TASK ICONS
    const taskIcons = document.createElement("div");
    taskIcons.classList.add("task-icons");
    taskItem.appendChild(taskIcons);
    // CHECK ICON
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fas", "fa-check-square");
    checkIcon.addEventListener("click", markAsDone);
    taskIcons.appendChild(checkIcon);
    // UNDO ICON
    const undoIcon = document.createElement("i");
    undoIcon.classList.add("fas", "fa-undo-alt");
    undoIcon.addEventListener("click", resetTask);
    taskIcons.appendChild(undoIcon);
    // TRASH ICON
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash-alt");
    trashIcon.addEventListener("click", deleteTask);
    taskIcons.appendChild(trashIcon);


    taskList.appendChild(taskItem);


    // RESET 
    taskInput.value = "";
    importanceBtn.classList.remove("important")
    importanceCheck.checked = false;

}



function markAsDone (e) {
    e.target.parentElement.parentElement.classList.add("complete");

    const titleList = taskArray.map(function(item) {
        return item.title;
    });
    
    const itemIndex = titleList.indexOf(e.target.parentElement.parentElement.firstElementChild.innerText);
    taskArray[itemIndex].complete = true;
    console.log(taskArray[itemIndex]);

    uppdateTaskStorage();
}

function resetTask(e) {
    e.target.parentElement.parentElement.classList.remove("complete");
    const titleList = taskArray.map(function(item) {
        return item.title;
    });
    
    const itemIndex = titleList.indexOf(e.target.parentElement.parentElement.firstElementChild.innerText);
    taskArray[itemIndex].complete = false;
    console.log(taskArray[itemIndex]);

    uppdateTaskStorage();
}

function deleteTask(e) {
    const titleList = taskArray.map(function(item) {
        return item.title;
    });
    
    const itemIndex = titleList.indexOf(e.target.parentElement.parentElement.firstElementChild.innerText);
    taskArray.splice(itemIndex, 1);
    console.log(taskArray);

    uppdateTaskStorage();
    e.target.parentElement.parentElement.remove();
} 

function toggleImportance(e) {
    e.target.classList.toggle("important");
}

function uppdateTaskStorage() {
    localStorage.setItem("taskStorage", JSON.stringify(taskArray));
}

function retriveTaskStorage() {
    return JSON.parse(localStorage.getItem("taskStorage"));
}


