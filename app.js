const hamberger = document.querySelector(".hamberger_menu");
const parent = document.querySelector(".parent");

hamberger.addEventListener("click", () => {
  parent.classList.toggle("action");
});

// // const show = document.getElementById("show");

// // const nav = document.querySelector(".nav_link");

// // show.addEventListener("click", () => {
// //   nav.classList.toggle("action");
// // });

// const nav = document.querySelectorAll(".nav_link");

// function LinkAction() {
//   const show = document.getElementById("show");
//   show.classList.toggle("active");
// }

// nav.forEach((n) => n.addEventListener("click", LinkAction));
