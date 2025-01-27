const writeTask = document.querySelector('.writeTask');
const btn = document.querySelector('.btn');
const toDoContainer = document.querySelector('.toDoContainer');

// Функция для сохранения списка в localStorage
function saveTasks() {
    const tasks = [];
    const items = document.querySelectorAll('.toDoContainer li');
    items.forEach(item => {
        tasks.push({
            text: item.innerText,
            completed: item.classList.contains('taskCompleted')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            const item = document.createElement('li');
            item.innerText = task.text;
            toDoContainer.appendChild(item);
            item.classList.add('newLine');
            if (task.completed) {
                item.classList.add('taskCompleted');
            }

            // Добавляем обработчики событий для каждой задачи
            item.addEventListener('click', function() {
                item.classList.add('taskCompleted');
                saveTasks();
            });

            item.addEventListener('dblclick', function() {
                toDoContainer.removeChild(item);
                saveTasks();
            });
        });
    }
}

// Добавляем новую задачу
btn.addEventListener('click', function() {
    const item = document.createElement('li');
    if (writeTask.value.trim() === '') {
        alert('Пожалуйста, напишите задачу!');
        return;
    }
    item.innerText = writeTask.value;
    toDoContainer.appendChild(item);
    writeTask.value = '';
    item.classList.add('newLine');

    // Обработчик для отметки задачи выполненной
    item.addEventListener('click', function() {
        item.classList.add('taskCompleted');
        saveTasks();
    });

    // Обработчик для удаления задачи
    item.addEventListener('dblclick', function() {
        toDoContainer.removeChild(item);
        saveTasks();
    });

    saveTasks(); // Сохраняем обновлённый список задач
});

// Добавляем задачу по нажатию Enter
writeTask.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        btn.click();
    }
});

// Загружаем задачи при загрузке страницы
loadTasks();