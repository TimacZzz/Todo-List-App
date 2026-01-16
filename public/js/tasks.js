// Navbar Btns
const addTaskBtn = document.getElementById("add-task-btn")
const dailyTasksBtn = document.getElementById("daily-tasks-btn")
const fourQuadrantsBtn = document.getElementById("four-quadrants-btn")
const logOutBtn = document.getElementById("log-out-btn")

// Sections
const addTask = document.getElementById("add-task")
const dailyTasks = document.getElementById("daily-tasks")
const fourQuadrants = document.getElementById("four-quadrants")

// Containers to display users' tasks
const dailyTasksContainer = document.getElementById("daily-tasks-container")
const quadrant1TasksContainer = document.getElementById("quadrant1-tasks-container");
const quadrant2TasksContainer = document.getElementById("quadrant2-tasks-container");
const quadrant3TasksContainer = document.getElementById("quadrant3-tasks-container");
const quadrant4TasksContainer = document.getElementById("quadrant4-tasks-container");

// Daily Task Section
const quadrantMap = new Map();
quadrantMap.set(1, 'Urgent & Important');
quadrantMap.set(2, 'Not Urgent & Important');
quadrantMap.set(3, 'Urgent & Not Important');
quadrantMap.set(4, 'Not Urgent & Not Important');

dailyTasksBtn.addEventListener("click", async () => {
    addTask.classList.add("hidden");
    fourQuadrants.classList.add("hidden");
    dailyTasks.classList.remove("hidden");

    const res = await fetch('/userHomepage/dailyTasks');
    const data = await res.json();

    if (res.ok){
        resultString = "<ul>"

        for (const task of data.result){
            resultString += 
            `<li class="text" data-task-id="${task.id}">
                <div>
                    <span>${task.title} - ${quadrantMap.get(parseInt(task.quadrant))}</span>
                    <span class="material-symbols-outlined delete">delete</span>
                </div>
            </li>`
        }

        resultString += "</ul>"

        dailyTasksContainer.innerHTML = resultString;

        setUpDeleteLogic();
        setUpDescriptionLogic();
    }
    else{
        const errorMessage = data.error;
        modalContent.textContent = `${errorMessage} Please try again!`;
        modal.showModal();
    }
})

// Four Quadrants Section
fourQuadrantsBtn.addEventListener("click", async () => {
    addTask.classList.add("hidden");
    dailyTasks.classList.add("hidden");
    fourQuadrants.classList.remove("hidden");

    const res = await fetch('/userHomepage/fourQuadrantsTasks');
    const data = await res.json();

    if (res.ok){
        quadrant1String = "<ul>"
        quadrant2String = "<ul>"
        quadrant3String = "<ul>"
        quadrant4String = "<ul>"

        for (const task of data.result){
            if (task.quadrant == 1){
                quadrant1String += 
                `<li class="text" data-task-id="${task.id}">
                    <div>
                        <span>${task.title}</span>
                        <span class="material-symbols-outlined delete">delete</span>
                    </div>
                </li>`
            }
            else if (task.quadrant == 2){
                quadrant2String += 
                `<li class="text" data-task-id="${task.id}">
                    <div>
                        <span>${task.title}</span>
                        <span class="material-symbols-outlined delete">delete</span>
                    </div>
                </li>`

            }
            else if (task.quadrant == 3){
                quadrant3String += 
                `<li class="text" data-task-id="${task.id}">
                    <div>
                        <span>${task.title}</span>
                        <span class="material-symbols-outlined delete">delete</span>
                    </div>
                </li>`

            }
            else{
                quadrant4String += 
                `<li class="text" data-task-id="${task.id}">
                    <div>
                        <span>${task.title}</span>
                        <span class="material-symbols-outlined delete">delete</span>
                    </div>
                </li>`
            }           
        }

        quadrant1String += "</ul>"
        quadrant2String += "</ul>"
        quadrant3String += "</ul>"
        quadrant4String += "</ul>"

        quadrant1TasksContainer.innerHTML = quadrant1String;
        quadrant2TasksContainer.innerHTML = quadrant2String;
        quadrant3TasksContainer.innerHTML = quadrant3String;
        quadrant4TasksContainer.innerHTML = quadrant4String;

        setUpDeleteLogic();
        setUpDescriptionLogic();
    }
    else{
        const errorMessage = data.error;
        modalContent.textContent = `${errorMessage} Please try again!`;
        modal.showModal();
    }
})

// Add Task section navigation
addTaskBtn.addEventListener("click", () => {
    dailyTasks.classList.add("hidden");
    fourQuadrants.classList.add("hidden");
    addTask.classList.remove("hidden");
});

// Set up logic for log out
logOutBtn.addEventListener("click", async () => {
    try{
        const res = await fetch("/userHomepage/logout");
        const data = await res.json();
        window.location.href = "/"
    }
    catch(err){
        const errorMessage = data.error;
        modalContent.textContent = `${errorMessage} Please try again!`;
        modal.showModal();
    }
});

// Set up logic for add task
taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const dueDate = document.getElementById('due-date').value.trim();
    const quadrant = document.getElementById('quadrant-selection').value.trim();
    const description = document.getElementById('description').value.trim();

    taskForm.reset();

    try{
        const res = await fetch('/userHomepage/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, dueDate, quadrant, description})
        })

        const data = await res.json();

        if (res.ok){
            modalContent.textContent = `You have successfully added a task!`;
            modal.showModal();
        }
        else{
            const errorMessage = data.error;
            modalContent.textContent = `${errorMessage} Please try again!`;
            modal.showModal();
        }
    }
    catch (err){
        modalContent.textContent = `Network error: ${err} Please try again!`;
        modal.showModal();
    }
})

// Set up logic deleting tasks
async function setUpDeleteLogic(){
    const deleteBtnsArr = document.querySelectorAll(".delete");

    deleteBtnsArr.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", async (e) => {
            e.stopPropagation();

            const taskId = deleteBtn.closest('li').dataset.taskId;

            try{
                const res = await fetch(`/userHomepage/${taskId}`, {
                    method: 'DELETE',
                    credentials: 'include'
                })

                if (res.ok){
                    // Render the page again
                    if (dailyTasks.classList.contains("hidden")){
                        fourQuadrantsBtn.click();
                    }
                    else{
                        dailyTasksBtn.click();
                    }
                }
                else{
                    const errorMessage = data.error;
                    modalContent.textContent = `${errorMessage} Please try again!`;
                    modal.showModal();
                }
            }
            catch (err){
                modalContent.textContent = `Network error: ${err} Please try again!`;
                modal.showModal();
            }
        })
    })
}

// Modal
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
    modal.close();
});

const taskModal = document.getElementById("task-modal");
const taskModalHeader= document.getElementById("task-modal-header");
const taskModalContent = document.getElementById("task-modal-content");
const taskCloseBtn = document.getElementById("task-close-btn");

taskCloseBtn.addEventListener("click", () => {
    taskModal.close();
});

// Need logic to click onto each task and display description in another modal
async function setUpDescriptionLogic(){
    const tasksArr = document.querySelectorAll("li");

    tasksArr.forEach(task => {
        task.addEventListener("click", async () => {

            const taskId = task.dataset.taskId;

            try{
                const res = await fetch(`/userHomepage/${taskId}`);
                const data = await res.json();

                if (res.ok){
                    const result = data.result;

                    taskModalHeader.textContent = result.title + " - " + result.due_date;
                    taskModalContent.textContent = result.description;

                    taskModal.showModal();
                }
                else{
                    const errorMessage = data.error;
                    modalContent.textContent = `${errorMessage} Please try again!`;
                    modal.showModal();
                }
            }
            catch (err){
                modalContent.textContent = `Network error: ${err} Please try again!`;
                modal.showModal();
            }
        })
    })
}