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
             <div class="task">
              <input type="checkbox" class="checkbox"/>
              <p>Finish this project</p>
              </div>
              <div class="icons">
            <i class="fa-light fa-pen-to-square"></i>
             <i class="fa-solid fa-trash" style="color: #a13030;"></i> 
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