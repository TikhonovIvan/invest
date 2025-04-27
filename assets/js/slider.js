const swiper = new Swiper('.expert-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 2.2,
      },
      1024: {
        slidesPerView: 3.2,
      },
      1280: {
        slidesPerView: 4,
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });