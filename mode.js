const toggleMode = document.querySelector("#toggle-mode");
toggleMode.checked = JSON.stringify(localStorage.getItem("toggle-state")) || false;

if (toggleMode.checked) {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}

toggleMode.addEventListener("change", toggleDarkMode);

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("toggle-state", JSON.parse(toggleMode.checked));
}
