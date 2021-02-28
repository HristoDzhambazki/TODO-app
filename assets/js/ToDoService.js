const toDoStorage = (function () {
    let counter = 0;

    if (utils.getItem('taskCounter')) {
        counter = Number(utils.getItem('taskCounter'));
    }

    class Task {
        constructor(content) {
            this.id = ++counter;
            utils.setItem('taskCounter', counter);

            this.content = content;
            this.isCompleted = false;
        }
    }

    class ToDoStorage {
        constructor() {
            if (localStorage.getItem('listOfToDos')) {
                this.list = utils.getItem('listOfToDos');
            } else {
                this.list = [];
                utils.setItem('listOfToDos', this.list);
            }
        }

        addTask(content) {
            this.list.push(new Task(content));
            utils.setItem('listOfToDos', this.list);
        }

        removeTask(id) {
            let indexToRemove = this.list.findIndex(x => x.id == id);

            if (indexToRemove > -1) {
                this.list.splice(indexToRemove, 1);
                utils.setItem('listOfToDos', this.list);
            }
        }

        completeTask(id) {
            let indexOfToDo = this.list.findIndex(x => x.id == id);

            if (this.list[indexOfToDo].isCompleted) {
                this.list[indexOfToDo].isCompleted = false;
            } else {
                this.list[indexOfToDo].isCompleted = true;
            }

            utils.setItem('listOfToDos', this.list);
        }

        removeAllTasks() {
            this.list = [];
            utils.setItem('listOfToDos', this.list);

            counter = 0;
            utils.setItem('taskCounter', counter);
        }

        getAllTasks() {
            return this.list;
        }

        getLength() {
            return this.list.length;
        }
    }

    return new ToDoStorage();
})();
