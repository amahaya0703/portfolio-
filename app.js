const hamberger = document.querySelector(".hamberger_menu");
const show = document.querySelector(".show");

hamberger.addEventListener("click", () => {
  show.classList.toggle("active");
});
