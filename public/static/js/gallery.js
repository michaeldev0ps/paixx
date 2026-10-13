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

const waitForImage = (image) => {
  if (image.complete) {
    return image.naturalWidth > 0
      ? Promise.resolve(image)
      : Promise.reject(
        new Error(`Product preview image failed to load: ${image.currentSrc || image.src}`),
      );
  }

  return new Promise((resolve, reject) => {
    const onLoad = () => {
      cleanup();
      resolve(image);
    };
    const onError = () => {
      cleanup();
      reject(
        new Error(`Product preview image failed to load: ${image.currentSrc || image.src}`),
      );
    };
    const cleanup = () => {
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);
    };

    image.addEventListener("load", onLoad, { once: true });
    image.addEventListener("error", onError, { once: true });
  });
};

document.querySelectorAll("[data-product-preview]").forEach((preview) => {
  const card = preview.closest(".product-card-featured");
  const slides = [...preview.querySelectorAll(".product-preview-slide")];
  if (!card || slides.length === 0) return;

  const loadedSlides = new Map();
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let loadingAllSlides;
  let errorReported = false;
  let activeSlide = 0;

  const reportImageError = (error) => {
    if (errorReported) return;
    errorReported = true;
    console.error("Unable to load the Collection 001 preview images.", error);
    card.classList.add("is-preview-error");
    preview.disabled = true;
    preview.setAttribute("aria-label", "Product preview unavailable");
  };

  const loadSlide = (slide) => {
    const image = slide.querySelector(".product-preview-image");
    const reflection = slide.querySelector(".product-preview-reflection");
    if (!image) {
      return Promise.reject(new Error("A product preview slide is missing its image."));
    }

    if (image.dataset.previewSrc) {
      image.loading = "eager";
      if (image.dataset.previewSizes) {
        image.sizes = image.dataset.previewSizes;
      }
      if (image.dataset.previewSrcset) {
        image.srcset = image.dataset.previewSrcset;
      }
      image.src = image.dataset.previewSrc;
      delete image.dataset.previewSrc;
      delete image.dataset.previewSizes;
      delete image.dataset.previewSrcset;
    }

    return waitForImage(image).then(() => {
      if (!reflection) return;
      if (!reflection.hasAttribute("src")) {
        reflection.loading = "eager";
        reflection.src = image.currentSrc || image.src;
      }
      return waitForImage(reflection);
    });
  };

  const ensureSlideLoaded = (slide) => {
    if (!loadedSlides.has(slide)) {
      loadedSlides.set(slide, loadSlide(slide));
    }
    return loadedSlides.get(slide);
  };

  const ensurePreviewReady = () => {
    if (card.classList.contains("is-preview-ready")) {
      return Promise.resolve(true);
    }
    if (!loadingAllSlides) {
      loadingAllSlides = Promise.all(slides.map(ensureSlideLoaded))
        .then(() => {
          card.classList.add("is-preview-ready");
          return true;
        })
        .catch((error) => {
          reportImageError(error);
          return false;
        });
    }
    return loadingAllSlides;
  };

  if (reducedMotion) {
    const currentLabel = slides[0]
      .querySelector(".product-preview-label")
      ?.textContent.trim();
    preview.removeAttribute("aria-pressed");
    preview.setAttribute(
      "aria-label",
      `Show next hoodie design. Currently ${currentLabel || "selected"}.`,
    );
  }

  ensureSlideLoaded(slides[0]).catch(reportImageError);

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    preview.addEventListener("pointerenter", () => {
      void ensurePreviewReady();
    });
  }

  preview.addEventListener("click", () => {
    void ensurePreviewReady().then((ready) => {
      if (!ready) return;

      if (reducedMotion) {
        activeSlide = (activeSlide + 1) % slides.length;
        slides.forEach((slide, index) => {
          slide.classList.toggle("is-active", index === activeSlide);
        });
        const currentLabel = slides[activeSlide]
          .querySelector(".product-preview-label")
          ?.textContent.trim();
        preview.setAttribute(
          "aria-label",
          `Show next hoodie design. Currently ${currentLabel || "selected"}.`,
        );
        return;
      }

      const isPlaying = card.classList.toggle("is-previewing");
      preview.setAttribute("aria-pressed", String(isPlaying));
      preview.setAttribute(
        "aria-label",
        `${isPlaying ? "Pause" : "Play"} hoodie design preview`,
      );
    });
  });
});
