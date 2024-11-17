import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

class SwiperElement extends HTMLElement {
  swiper = null;
  currentSlide = 0;
  //Implemented currentSlide tracking because
  //when the swiper got reinitialized it continues from the wrong slide
  leftNavigationButton = this.querySelector(".nav-left");
  rightNavigationButton = this.querySelector(".nav-right");
  toggleSwiperButton = this.querySelector(".btn-toggle-swiper");

  constructor() {
    super();
    this.initializeSwiper = this.initializeSwiper.bind(this);
    this.destroySwiper = this.destroySwiper.bind(this);
    this.toggleSwiper = this.toggleSwiper.bind(this);
  }

  connectedCallback() {
    if (!this.querySelector(".swiper")) {
      console.log("Swiper element not found");
      return;
    }

    this.toggleSwiperButton.addEventListener("click", this.toggleSwiper);
    this.initializeSwiper();
  }

  disconnectedCallback() {
    this.destroySwiper();
  }

  initializeSwiper() {
    this.swiper = new Swiper(this.querySelector(".swiper"), {
      lazyLoading: true,
      loop: true,
      initialSlide: this.currentSlide,
      keyboard: {
        enabled: true,
      },
      breakpoints: {
        0: { slidesPerView: 1.05, spaceBetween: 8 },
        480: { slidesPerView: 2, spaceBetween: 8 },
        768: { slidesPerView: 2.9, spaceBetween: 8 },
        992: { slidesPerView: 2.9, spaceBetween: 8 },
        1200: { slidesPerView: 2.9, spaceBetween: 8 },
        1441: { slidesPerView: 4, spaceBetween: 8 },
        2000: { slidesPerView: 6, spaceBetween: 8 },
      },
      navigation: {
        nextEl: this.rightNavigationButton,
        prevEl: this.leftNavigationButton,
      },
    });

    this.swiper.on("realIndexChange", () => {
      this.currentSlide = this.swiper.realIndex;
      console.log(`Index: ${this.currentSlide}`);
    });

    // Other solution
    //this.swiper.on("slideChange", () => {
    //  this.currentSlide = this.swiper.realIndex;
    //  console.log(`Index: ${this.currentSlide}`);
    //});
  }

  destroySwiper() {
    if (this.swiper) {
      this.currentSlide = this.swiper.realIndex;
      this.swiper.destroy(true, false);
      this.swiper = null;
    }
  }

  toggleSwiper() {
    if (this.swiper) {
      this.destroySwiper();
      this.toggleSwiperButton.textContent = "Enable Swiper";
    } else {
      this.initializeSwiper();
      this.toggleSwiperButton.textContent = "Disable Swiper";
    }
  }
}

customElements.define("swiper-element", SwiperElement);
