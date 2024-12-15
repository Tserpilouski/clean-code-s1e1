const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-button');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

function addTask(){
    const taskText = taskInput.value;
    if (!taskText){
        return
    };
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
}

function createNewTaskElement(taskText){
    const listItem = document.createElement("li");

    const checkBox = createElement("input", { type: "checkbox" });
    const label = createElement("label", { className: "task-label", innerText: taskText });
    const editInput = createElement("input", { type: "text", className: "task-input" });
    const editButton = createElement("button", { className: "edit-button", innerText: "Edit" });
    const deleteButton = createDeleteButton();

    listItem.append(checkBox, label, editInput, editButton, deleteButton);
    return listItem;
}

function createElement(tag, attributes) {
    const element = document.createElement(tag);
    Object.assign(element, attributes);
    return element;
}

function createDeleteButton() {
    const deleteButton = createElement("button", { className: "delete-button" });
    const deleteButtonImg = createElement("img", { src: "./remove.svg", alt: "Remove icon" });
    deleteButton.appendChild(deleteButtonImg);
    return deleteButton;
}

function editTask(){
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('.task-input');
    const label = listItem.querySelector('.task-label');
    const editBtn = listItem.querySelector('.edit-button');

    const isEditMode = listItem.classList.contains('edit-mode');
    
    if(isEditMode){
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    listItem.classList.toggle('edit-mode');
};

function deleteTask(){
    const listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);
}

function taskCompleted(){
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


function taskIncomplete(){
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener('click', addTask);


function bindTaskEvents(taskListItem,checkBoxEventHandler){
    const checkBox = taskListItem.querySelector('input[type = checkbox]');
    const editButton = taskListItem.querySelector('.edit-button');
    const deleteButton = taskListItem.querySelector('.delete-button');

    checkBox.onchange = checkBoxEventHandler;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
}

function initializeTasks(holder, checkBoxEventHandler) {
    Array.from(holder.children).forEach(task  => bindTaskEvents(task, checkBoxEventHandler));
}

initializeTasks(incompleteTaskHolder, taskCompleted);
initializeTasks(completedTasksHolder, taskIncomplete);