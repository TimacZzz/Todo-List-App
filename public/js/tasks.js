// Navbar Btns
const addTaskBtn = document.getElementById("add-task-btn")
const dailyTasksBtn = document.getElementById("daily-tasks-btn")
const fourQuadrantsBtn = document.getElementById("four-quadrants-btn")
const logOutBtn = document.getElementById("log-out-btn")

// Sections
const addTask = document.getElementById("add-task")
const dailyTasks = document.getElementById("daily-tasks")
const fourQuadrants = document.getElementById("four-quadrants")

// Set up logic for navigation between sections
const sections = new Map();
sections.set(addTaskBtn, addTask);
sections.set(dailyTasksBtn, dailyTasks);
sections.set(fourQuadrantsBtn, fourQuadrants);

for (const key of sections.keys()){
    key.addEventListener("click", () => {
        for (const [btn, page] of sections){
            if (btn !== key){
                page.classList.add("hidden");
            }
            else{
                page.classList.remove("hidden");
            }
        }
    })
}

// Set up logic for log out
logOutBtn.addEventListener("click", async () => {
    try{
        const res = await fetch("/userHomepage/logout");
        window.location.href = "/"
    }
    catch(err){
        console.log("Failed to log out", err)
    }
});

const deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click", () => {
    const task = deleteBtn.closest('li');
    task.remove();
})


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
            console.log("Success")
        }
        else{

        }
    }
    catch (err){
        console.error("Network error: " + err)
    }
    finally{

    }
})