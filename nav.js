const home = document.querySelector("#home");
const notes = document.querySelector("#notes");
const todoApp = document.querySelector(".container");
let navItems = document.querySelectorAll(".nav-item");
let appItems = document.querySelectorAll(".app");

// nav functionality
function navButton(clickedButton) {
  // remove 'highlight' and 'non-hover' from buttons
  navItems.forEach((button) => {
    button.classList.remove("highlight", "no-hover");
    // make all apps hidden
    appItems.forEach((app) => {
      app.setAttribute("hidden", "");
    });
  });
  // add 'highlight' and 'no-hover' to clicked button
  clickedButton.classList.add("highlight", "no-hover");
  // remove hidden from selected app
  document
    .querySelector(`#${clickedButton.innerText}-app`)
    .removeAttribute("hidden");
}

// add event listener to all buttons in the navigation
navItems.forEach((button) => {
  button.addEventListener("click", () => {
    navButton(button);
  });
});
