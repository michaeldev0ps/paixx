const entrance = document.querySelector(".monolithic-entrance");
if (entrance) {
  const fractureAt = entrance.offsetHeight * 0.35;
  const update = () => {
    if (window.scrollY > fractureAt) entrance.classList.add("is-fractured");
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}
