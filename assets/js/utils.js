const utils = (function () {

    //Browser storage functions
    function setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    //DOM Selectors
    //Containers
    let allTasksDiv = document.getElementById('currentTasks');

    //Buttons
    let clearAllButton = document.querySelector('#clearDiv button')

    //Accessing Handlebars 
    var source = document.getElementById("newTask").innerHTML;
    var template = Handlebars.compile(source);

    //Render Tasks + Show and hide ClearAll Button
    function renderTasks() {
        let currElements = template({ tasks: toDoStorage.getAllTasks() });
        allTasksDiv.innerHTML = currElements;
        changeNumberOfTasks();

        if (toDoStorage.getLength() === 0) {
            clearAllButton.style.display = 'none';
        } else {
            clearAllButton.style.display = 'block';
        }
    }

    //Change text of pending tasks
    function changeNumberOfTasks() {
        let counterTextElement = document.getElementById('pendingTasks');

        let tasksCount = toDoStorage.getLength();
        if (tasksCount === 1) {
            counterTextElement.innerText = `You have ${tasksCount} pending task.`
        } else {
            counterTextElement.innerText = `You have ${tasksCount} pending tasks.`
        }
    }

    // Hover Delete img
    allTasksDiv.addEventListener('mouseover', overDeleteButton);
    allTasksDiv.addEventListener('mouseout', outDeleteButton);

    function outDeleteButton(event) {
        let target = event.target;

        if (target.tagName === 'IMG') {
            let paragraphElement = target.previousElementSibling;
            paragraphElement.style.opacity = '1';
        }
    }

    function overDeleteButton(event) {
        let target = event.target;

        if (target.tagName === 'IMG') {
            let paragraphElement = target.previousElementSibling;
            paragraphElement.style.opacity = '0.3';
        }
    }

    return {
        getItem,
        setItem,
        renderTasks,
    }
})();