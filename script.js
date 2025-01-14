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
    tasksList.innerHTML = "";

    tasks.forEach((task,index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
             <div class="task ${task.completed ? "completed" : ""}">  
              <input type="checkbox" class="checkbox" ${
                task.completed ? "checked" : ""
              }/>
              <p>${task.text}</p>
              </div>
              <div class="icons">
            <i class="fa-light fa-pen-to-square" onClick="editTask(${index})></i>
             <i class="fa-solid fa-trash" style="color: #a13030;" deleteTask(${index})></i> 
              </div>
            </div>
            `;
            listItem.addEventListener('change',()=> toggleTaskComplete(index));
          tasksList.append(listItem);
        
    });
};

document.getElementById('newTask').addEventListener('click', function(e) {
    e.preventDefault();
   addTask();
});