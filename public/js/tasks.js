const deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click", () => {
    const task = deleteBtn.closest('li');
    task.remove();
})


console.log("script is loaded")