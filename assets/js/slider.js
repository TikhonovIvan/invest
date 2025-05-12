const swiper = new Swiper('.expert-swiper', {
    slidesPerView: 1.4,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      425: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1380: {
        slidesPerView: 4,
      }
    },
    navigation: {
      nextEl: '.expert-button-next',  // Используем уникальный класс
      prevEl: '.expert-button-prev',  // Используем уникальный класс
    },
});

/* Слайдер статьи */
const swiper1 = new Swiper('.article-swiper', {
    slidesPerView: 1.4,
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      425: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1380: {
        slidesPerView: 4,
      }
    },
    navigation: {
      nextEl: '.article-button-next',  // Используем уникальный класс
      prevEl: '.article-button-prev',  // Используем уникальный класс
    },
});
// Отзывы слайдер

  const reviewsSwiper = new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {

      425: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },

      1250: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 2,
      }
    },
    navigation: {
      nextEl: '.reviews-button-next',
      prevEl: '.reviews-button-prev',
    },
  });


  
  
  
  