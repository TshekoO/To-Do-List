let tasks = [];
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({text: text,completed: false});
       updateTasksList();
       
    }
};

const updateTasksList = () => {
    const tasksList = document.getElementById('task-list');
    tasksList.innerHTML = '';
}

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
   addTask();
});