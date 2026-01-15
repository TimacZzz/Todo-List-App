// Handle the switch between login & sign up
const loginContainer = document.getElementById("login");
const signUpContainer = document.getElementById("sign-up");
const loginLink = document.getElementById("login-link");
const signUpLink = document.getElementById("sign-up-link");

loginLink.addEventListener("click", () => {
    loginContainer.classList.remove("hidden");
    signUpContainer.classList.add("hidden");
});

signUpLink.addEventListener("click", () => {
    signUpContainer.classList.remove("hidden");
    loginContainer.classList.add("hidden");
});

// Modal
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
    modal.close();
});

// Handle the sign up logic
const signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById('sign-up-username').value.trim();
    const password = document.getElementById('sign-up-password').value.trim();

    signUpForm.reset();

    try{
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })

        const data = await res.json();

        if (res.ok){
            modalContent.textContent = "You have successfully registered!"
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

// Handle the login logic
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    try{
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })

        const data = await res.json();

        if (res.ok){
            window.location.href = "/userHomepage";
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

