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
      breakpoints: {
  
        1400: {
          slidesPerView: 5,
        },
        1024: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        425: {
          slidesPerView: 2,
        },
        375: {
          slidesPerView: 1,
        },
        320: {
          slidesPerView: 1,
        },
      }
    });

    const mainSwiper = new Swiper(".main-slider", {
      spaceBetween: 1,
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  });