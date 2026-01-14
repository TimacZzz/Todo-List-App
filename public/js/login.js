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

// Handle the sign up logic
const signUpForm = document.getElementById("sign-up-form");
const alreadyRegistered = document.getElementById("already-registered");
const isRegistered = document.getElementById("is-registered");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById('sign-up-username').value.trim();
    const password = document.getElementById('sign-up-password').value.trim();

    signUpForm.reset();

    try{
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })

        const data = await res.json();

        if (res.ok){
            isRegistered.innerHTML = "You have successfully registered! Click <a id='success-message'>here</a> to login</p>";
            const successMessage = document.getElementById("success-message");
            alreadyRegistered.classList.add("hidden");
            isRegistered.classList.remove("hidden");

            successMessage.addEventListener("click", () => {
                loginContainer.classList.remove("hidden");
                signUpContainer.classList.add("hidden");
                alreadyRegistered.classList.remove("hidden");
                isRegistered.classList.add("hidden");
            })
        }
        else{
            const errorMessage = data.error;
            isRegistered.innerHTML = errorMessage + "Please register again!";
        }
    }
    catch (err){
        console.error("Network error: " + err)
    }
    finally{

    }
})

// Handle the login logic
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    try{
        const res = await fetch('/api/auth/login', {
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

        }
    }
    catch (err){
        console.error("Network error: " + err)
    }
    finally{

    }
})

