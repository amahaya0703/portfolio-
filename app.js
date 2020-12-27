const hamberger = document.querySelector(".hamberger_menu");
const parent = document.querySelector(".parent");

hamberger.addEventListener("click", () => {
  parent.classList.toggle("action");
});
