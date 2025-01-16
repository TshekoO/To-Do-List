document.addEventListener("DOMContentLoaded", async () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        storedTasks.forEach(task => tasks.push(task));
        await updateStats();
        await updateTasksList();
    }
});

let tasks = [];

const saveTasks = async () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = async () => {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const text = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (text) {
        tasks.push({ text, completed: false, dueDate });
        taskInput.value = "";
        dueDateInput.value = "";
        await updateTasksList();
        await updateStats();
        await saveTasks();
    }
};

const toggleTaskComplete = async (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        tasks[index].completedAt = new Date().toLocaleString();
    } else {
        delete tasks[index].completedAt;
    }
    await updateTasksList();
    await updateStats();
    await saveTasks();
};

const deleteTask = async (index) => {
    tasks.splice(index, 1);
    await updateTasksList();
    await updateStats();
    await saveTasks();
};

const editTask = async (index) => {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    taskInput.value = tasks[index].text;
    dueDateInput.value = tasks[index].dueDate;

    tasks.splice(index, 1);
    await updateTasksList();
    await updateStats();
    await saveTasks();
};

const updateStats = async () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTasksList = async () => {
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submit").addEventListener('click', async (e) => {
        e.preventDefault();
        await addTask();
    });
});