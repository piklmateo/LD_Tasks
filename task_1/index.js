class CustomElement extends HTMLElement {
  constructor() {
    super();

    const btnLearnMore = this.querySelector(".content-button");
    const hiddenParagraph = this.querySelector(".hiddenParagraph");
    const contentWrapper = this.querySelector(".content-wrapper");

    btnLearnMore.addEventListener("click", () => {
      hiddenParagraph.classList.add("visible");
      hiddenParagraph.classList.remove("hidden");
      btnLearnMore.classList.add("hidden");
      contentWrapper.classList.add("no-max-height");
    });
  }

  connectedCallback() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wrapper = this.querySelector(".wrapper");
          if (entry.isIntersecting) {
            wrapper.classList.add("in-view");
          } else {
            wrapper.classList.remove("in-view");
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const section = this.querySelector(".wrapper");
    observer.observe(section);
  }
}

customElements.define("custom-element", CustomElement);
