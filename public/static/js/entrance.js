const entrance = document.querySelector(".monolithic-entrance");
if (entrance) {
  const fractureAt = Math.min(entrance.offsetHeight * 0.05, 48);
  const dismissEntrance = () => entrance.classList.add("is-fractured");
  const update = () => {
    if (window.scrollY > fractureAt) dismissEntrance();
  };
  const enterButton = entrance.querySelector("[data-enter-site]");
  enterButton?.addEventListener("click", () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    dismissEntrance();
    window.scrollTo({
      top: Math.max(window.scrollY, fractureAt + 1),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });
  window.addEventListener("scroll", update, { passive: true });
  update();
}
