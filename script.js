document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateStats();
        updateTasksList();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (text) {
        tasks.push({ text: text, completed: false, dueDate: dueDate });
        taskInput.value = "";
        dueDateInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        tasks[index].completedAt = new Date().toLocaleString();
    } else {
        delete tasks[index].completedAt;
    }
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    taskInput.value = tasks[index].text;
    dueDateInput.value = tasks[index].dueDate;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
             <div class="task ${task.completed ? "completed" : ""}">  
              <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
              <p>${task.text}</p>
              ${task.dueDate ? `<span class="due-date">Due: ${task.dueDate}</span>` : ""}
              ${task.completed ? `<span class="timestamp">Completed at: ${task.completedAt}</span>` : ""}
              </div>
              <div class="icons">
               <img src="./img/edit3-removebg-preview.png" onclick="editTask(${index})" />
               <img src="./img/delete-removebg-preview.png" onclick="deleteTask(${index})" />
              </div>
            </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit").addEventListener('click', function(e) {
        e.preventDefault();
        addTask();
    });
});
