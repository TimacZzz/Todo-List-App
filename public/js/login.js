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

