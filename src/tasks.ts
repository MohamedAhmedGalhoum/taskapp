const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');
const taskListElement = document.querySelector<HTMLUListElement>('.list');
type Task = {
    description: string;
    isCompeleted: boolean;
};
const tasks: Task[] = loadTasks();

tasks.forEach(renderTask);

function createTask(event: SubmitEvent){
    event.preventDefault();
    const taskDescription = formInput?.value;
    if(taskDescription){
        const task: Task = {
            description: taskDescription,
            isCompeleted: false,
        }
        // ----- Add Task ----- //
        addTask(task);
        // ----- Render Task ----- //
        renderTask(task);
        // ----- Update Local Storage ----- //
        updateStorage();
        console.log(taskDescription);
        formInput.value = '';
        return;
    }
    alert('Please enter a task decription')
}

function loadTasks(): Task[]{
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks? JSON.parse(storedTasks):[]
}
taskForm?.addEventListener('submit' , createTask);

function addTask(task: Task): void{
    tasks.push(task);
}

function renderTask(task: Task): void{
    const taskElement = document.createElement('li');
    taskElement.textContent = task.description;
    // Check-Box //
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.isCompeleted;
    taskElement.appendChild(taskCheckbox);
    
    taskListElement?.appendChild(taskElement);
}

function updateStorage(): void{
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}