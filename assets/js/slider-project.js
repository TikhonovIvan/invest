document.addEventListener("DOMContentLoaded", function () {
    const thumbsSwiper = new Swiper(".thumbs-slider", {
      spaceBetween: 10,
      slidesPerView: 5, // <-- чтобы было видно 6 миниатюр сразу
      navigation: {
        nextEl: ".thumbs-next",
        prevEl: ".thumbs-prev",
      },
      watchSlidesProgress: true,
      freeMode: true,
    });

    const mainSwiper = new Swiper(".main-slider", {
      spaceBetween: 10,
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  });