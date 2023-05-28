const burger = document.querySelector(".nav__burger");
const list = document.querySelector(".nav__list");
burger.addEventListener("click", () => {
  burger.classList.toggle("burger-active");
  list.classList.toggle("nav-active");
});
