document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const panels = gallery.querySelectorAll("[data-gallery-panel]");
  const buttons = document.querySelectorAll("[data-gallery-button]");
  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      const index = button.dataset.galleryButton;
      panels.forEach((panel) =>
        panel.classList.toggle(
          "is-active",
          panel.dataset.galleryPanel === index,
        )
      );
      buttons.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button))
      );
    })
  );
});
