document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.querySelector('.section1 button');
    const incompleteTasks = document.getElementById("incomplete-tasks");
    const completedTasks = document.getElementById("completed-tasks");
    const clearButton = document.getElementById("clear");

    function createNewTask(taskName) {
        const listItem = document.createElement("li");
        const checkBox = document.createElement("input");
        const label = document.createElement("label");
        const editInput = document.createElement("input");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        checkBox.type = "checkbox";
        editInput.type = "text";

        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        label.innerText = taskName;

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function addTask() {
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            const listItem = createNewTask(taskName);
            incompleteTasks.appendChild(listItem);
            bindTaskEvents(listItem, completeTask);
            taskInput.value = '';
        }
    }

    function editTask() {
        const listItem = this.parentNode;
        const editInput = listItem.querySelector("input[type=text]");
        const label = listItem.querySelector("label");
        const containsClass = listItem.classList.contains("editMode");

        if (containsClass) {
            label.innerText = editInput.value;
        } else {
            editInput.value = label.innerText;
        }

        listItem.classList.toggle("editMode");
    }

    function deleteTask() {
        const listItem = this.parentNode;
        const ul = listItem.parentNode;
        ul.removeChild(listItem);
    }

    function completeTask() {
        const listItem = this.parentNode;
        completedTasks.appendChild(listItem);
        bindTaskEvents(listItem, incompleteTask);
    }

    function incompleteTask() {
        const listItem = this.parentNode;
        incompleteTasks.appendChild(listItem);
        bindTaskEvents(listItem, completeTask);
    }

    function bindTaskEvents(taskListItem, checkBoxEventHandler) {
        const checkBox = taskListItem.querySelector("input[type=checkbox]");
        const editButton = taskListItem.querySelector("button.edit");
        const deleteButton = taskListItem.querySelector("button.delete");

        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = checkBoxEventHandler;
    }

    clearButton.addEventListener("click", function () {
        completedTasks.innerHTML = '';
    });

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    const modeSwitch = document.getElementById('modeSwitch');
    modeSwitch.addEventListener('change', toggleDarkMode);

    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');
    }
});