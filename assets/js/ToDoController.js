(function () {
    utils.renderTasks();

    //DOM Selectors
    // Containers
    let currentTasksDiv = document.getElementById('currentTasks');
    // Inputs
    let inputTextElement = document.querySelector('#addNewTaskDiv input');

    // Buttons
    let addNewTaskButton = document.querySelector('#addNewTaskDiv button');
    let clearAllButton = document.getElementById('clearAllBtn')

    // Complete or Delete Task
    currentTasksDiv.addEventListener('click', onCheckOrDeleteBtn);

    // Add New Taks
    addNewTaskButton.addEventListener('click', addNewTask);

    // Remove All Tasks
    clearAllButton.addEventListener('click', removeAllTasks);


    function removeAllTasks() {
        toDoStorage.removeAllTasks();
        utils.renderTasks();
    }


    function onCheckOrDeleteBtn(event) {
        let target = event.target;
        let taskId = target.parentElement.parentElement.id;

        if (target.tagName === 'INPUT') {
            toDoStorage.completeTask(taskId);

        } else if (target.tagName === 'IMG') {
            toDoStorage.removeTask(taskId);

        }

        utils.renderTasks();
    }

    function addNewTask() {
        let inputText = inputTextElement.value;
        inputTextElement.value = '';

        if (inputText.trim() != '') {

            toDoStorage.addTask(inputText.trim());

            utils.renderTasks();
        }
    }
})();
