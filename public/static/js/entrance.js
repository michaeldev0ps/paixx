const entrance = document.querySelector(".monolithic-entrance");
if (entrance) {
  const fractureAt = Math.min(entrance.offsetHeight * 0.05, 48);
  const update = () => {
    if (window.scrollY > fractureAt) entrance.classList.add("is-fractured");
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}
