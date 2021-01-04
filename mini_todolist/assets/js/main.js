const ToDoApp = (function Application() {

    // PRIVATE VARIABLES
    const STATE = {
        todos: new Array()
    }

    const input = document.getElementById('input');
    const submit = document.getElementById('submit');

    return class App {

        static onload() {
            // initialize the current date
            document.getElementById('top').innerHTML = `
                <h2>To-Do List</h2><span>${new Date().toDateString()}</span>
            `

            // initiailize local todos if any
            if (localStorage.getItem('todos')) {
                STATE.todos.push(...JSON.parse(localStorage.getItem('todos')))
                STATE.todos.forEach(todo => new HTMLTaskElement(todo.task, todo.done))
            }

            // initialize event listeners
            submit.onclick = () => ToDoApp.addTodo();
            input.onkeypress = e => e.key === 'Enter' ? ToDoApp.addTodo() : null
        }


        static addTodo = () => {
            // create/append task element
            new HTMLTaskElement(input.value, false);

            // update the state/local data
            STATE.todos.push({ task: input.value, done: false });
            localStorage.setItem('todos', JSON.stringify(STATE.todos));

            // reset the inputs
            input.value = '';
        }


        static modTodo = (element, isDone) => {
            STATE.todos = STATE.todos.map(todo => {
                if (todo.task === element.childNodes[0].textContent) {
                    todo.done = isDone;
                    return todo
                }

                return todo
            })

            localStorage.setItem('todos', JSON.stringify(STATE.todos));
        }


        static onclickRemoveTodo = el => {
            // remove the todo from the state
            STATE.todos = STATE.todos
                .filter(todo => todo.task !== el.parentNode.childNodes[0].textContent)

            // update the local date
            localStorage.setItem('todos', JSON.stringify(STATE.todos));

            // transition out the removed todo
            el.parentNode.classList.add('fadeOutRight');
            setTimeout(() => { el.parentNode.remove(); }, 500);
        }


        static onclickToggleTodo = el => {
            // to finish a task
            if (el.className === 'taskitem') {
                ToDoApp.modTodo(el, true)
                return el.classList.add('taskitem-done')
            }

            // to undo finished task
            if (el.className === 'taskitem taskitem-done') {
                ToDoApp.modTodo(el, false)
                return el.classList.remove('taskitem-done')
            }
        }
    }

})()

// model for each task, auto append to ul (tasklist)
function HTMLTaskElement(task, done) {

    // create needed elements and its properties
    const rmvIcon = document.createElement('i');
    const li = document.createElement('li');
    rmvIcon.classList.add('taskitem-remove');
    rmvIcon.classList.add('ion-android-remove-circle');
    li.textContent = task;
    li.classList.add('taskitem');

    if (done)
        li.classList.add('taskitem-done')

    // mount event listeners
    li.onclick = () => ToDoApp.onclickToggleTodo(li);
    rmvIcon.onclick = () => ToDoApp.onclickRemoveTodo(rmvIcon);

    // mount to DOM
    li.appendChild(rmvIcon)
    document.getElementById('tasklist').appendChild(li);

}

// onload of the document
window.onload = ToDoApp.onload;