document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.description;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.addEventListener('click', () => toggleTaskCompleted(index));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(index);
            });
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    const addTask = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = { description: taskInput.value, completed: false };
        tasks.push(newTask);
        saveTasks(tasks);
        taskInput.value = '';
    };

    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
    };

    const toggleTaskCompleted = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
