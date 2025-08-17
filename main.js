let btn = document.querySelector("button");
let list = document.querySelector("#todo-list");
let input = document.querySelector("input");

let local = JSON.parse(localStorage.getItem('Tasks')) || [];
let taskId = local.length;

window.onload = function() {
    loadTasks();
};

function loadTasks() {
    list.innerHTML = '';
    local.forEach(task => {
        let isChecked = task.completed ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
        let textDecoration = task.completed ? 'text-decoration: line-through;' : '';
        
        list.innerHTML += `
            <li id="${task.id}">
                <div class="task">
                    <i id="check-task" class="${isChecked}"></i>
                    <span style="${textDecoration}">${task.text}</span>
                </div>
                <div class="edit">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </li>`;
    });
}

function addStorage() {
    if (input.value) {
        let newTask = {
            id: `task${taskId++}`,
            text: input.value.trim(),
            completed: false
        };
        local.push(newTask);
        localStorage.setItem("Tasks", JSON.stringify(local));
    }
}

btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (input.value) {
        addStorage();
        loadTasks();
        input.value = '';
    }
});

list.addEventListener('click', function (e) {
    if (e.target.id === 'check-task') {
        let checkbox = e.target;
        let taskElement = checkbox.closest('li');
        let taskId = taskElement.id;
        
        let taskIndex = local.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            local[taskIndex].completed = !local[taskIndex].completed;
            localStorage.setItem('Tasks', JSON.stringify(local));
            loadTasks();
        }
    }

    if (e.target.classList.contains('fa-trash')) {
        let taskElement = e.target.closest('li');
        let taskId = taskElement.id;
        local = local.filter(task => task.id !== taskId);
        localStorage.setItem('Tasks', JSON.stringify(local));
        loadTasks();
    }
});