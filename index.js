const writeTask = document.querySelector('.writeTask');
const btn = document.querySelector('.btn');
const toDoContainer = document.querySelector('.toDoContainer');


btn.addEventListener('click', function() {
    const item = document.createElement('li');
    item.innerText = writeTask.value;
    toDoContainer.appendChild(item);
    writeTask.value = '';
    item.classList.add('newLine');
    item.addEventListener('click', function() {
        item.classList.add('taskCompleted');
    })
    item.addEventListener('dblclick', function() {
        toDoContainer.removeChild(item);
    })
})

writeTask.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        btn.click();

    }
});