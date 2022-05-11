const toggleMode = document.querySelector("#toggle-mode");

toggleMode.addEventListener("change", toggleDarkMode);

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
