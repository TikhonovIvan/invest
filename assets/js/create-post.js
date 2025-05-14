window.addEventListener("load", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const segments = document.querySelectorAll(".progress-segment");
  const circles = document.querySelectorAll(".circle");
  const stepCount = document.querySelectorAll(".step-count");

  let currentStep = 1;
  let activeForm = document.querySelector(".tab-content.active");

  // Переключение вкладок
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach((content) => content.classList.remove("active"));
      document.getElementById(tab.dataset.target).classList.add("active");

      activeForm = document.querySelector(".tab-content.active");
      resetSteps();
    });
  });

  function resetSteps() {
    currentStep = 1;
    updateSteps();
  }

  function updateSteps() {
    activeForm = document.querySelector(".tab-content.active");
    const allSteps = activeForm.querySelectorAll(".form-step");

    allSteps.forEach((step) => step.classList.remove("active", "hidden"));

    if (window.innerWidth <= 426) {
      allSteps.forEach((step) => step.classList.add("hidden"));
      const current = activeForm.querySelector(`.form-step[data-step="${currentStep}"]`);
      if (current) {
        current.classList.remove("hidden");
        current.classList.add("active");
      }
    }

    updateProgress();
  }

  function checkImages() {
    // Ищем все загруженные изображения внутри imageContainer
    const imageContainer = activeForm.querySelector('#imageContainer');
    if (!imageContainer) return false;
    
    // Проверяем наличие элементов изображений (не input file, а уже загруженных preview)
    const uploadedImages = imageContainer.querySelectorAll('img:not([type="file"]), .image-preview');
    return uploadedImages.length > 0;
  }

  function updateProgress() {
    let completedSteps = 0;

    for (let i = 1; i <= 3; i++) {
      const stepFields = activeForm.querySelectorAll(`.form-step[data-step="${i}"] input:required`);
      let filled = Array.from(stepFields).every(input => input.value.trim() !== "");
      
      // Для шага 1 дополнительно проверяем наличие изображений
      if (i === 1) {
        filled = filled && checkImages();
      }

      if (filled) completedSteps++;

      circles.forEach((circle) => {
        if (+circle.dataset.step === i) {
          circle.classList.toggle("complete", filled);
        }
      });
    }

    // Обновляем визуальные сегменты прогресса
    segments.forEach((segment, i) => {
      segment.classList.toggle("active", i < completedSteps);
    });

    // Обновляем номер текущего шага
    stepCount.forEach((el) => {
      el.textContent = currentStep;
    });

    // Кнопка "Продолжить"
    const currentFields = activeForm.querySelectorAll(`.form-step[data-step="${currentStep}"] input:required`);
    let allCurrentFilled = Array.from(currentFields).every(input => input.value.trim() !== "");
    
    // Для шага 1 дополнительно проверяем наличие изображений
    if (currentStep === 1) {
      allCurrentFilled = allCurrentFilled && checkImages();
    }

    const nextBtn = activeForm.querySelector(`.form-step[data-step="${currentStep}"] .next-btn`);
    if (nextBtn) {
      nextBtn.disabled = !allCurrentFilled;
      nextBtn.style.opacity = allCurrentFilled ? 1 : 0.5;
      nextBtn.style.cursor = allCurrentFilled ? "pointer" : "not-allowed";
    }

    // Кнопка "Опубликовать" на десктопе
    if (window.innerWidth > 426) {
      const submitBtn = activeForm.querySelector(`.form-step[data-step="3"] .submit-btn`);
      if (submitBtn) {
        const step3Fields = activeForm.querySelectorAll(`.form-step[data-step="3"] input:required`);
        const allFilled = Array.from(step3Fields).every(input => input.value.trim() !== "");
        submitBtn.disabled = !allFilled;
        submitBtn.style.opacity = allFilled ? 1 : 0.5;
        submitBtn.style.cursor = allFilled ? "pointer" : "not-allowed";
      }
    }
  }

  // Обработка кнопок "Продолжить"
  document.querySelectorAll(".next-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentFields = activeForm.querySelectorAll(`.form-step[data-step="${currentStep}"] input:required`);
      let allFilled = Array.from(currentFields).every(input => input.value.trim() !== "");
      
      // Для шага 1 дополнительно проверяем наличие изображений
      if (currentStep === 1) {
        allFilled = allFilled && checkImages();
      }
      
      if (allFilled && currentStep < 3) {
        currentStep++;
        updateSteps();
      }
    });
  });

  // Следим за вводом
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateProgress);
  });

  // Улучшенный наблюдатель за изменениями изображений
  function observeImages() {
    const observer = new MutationObserver(function(mutations) {
      // Принудительно обновляем прогресс при изменении изображений
      updateProgress();
    });

    const imageContainer = document.querySelector('#imageContainer');
    if (imageContainer) {
      observer.observe(imageContainer, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }
  }

  resetSteps();
  observeImages();

  // Дополнительно вызываем updateProgress при загрузке изображений через input file
  document.querySelectorAll('#imageInput').forEach(input => {
    input.addEventListener('change', function() {
      // Даем немного времени на обработку изображений перед проверкой
      setTimeout(updateProgress, 300);
    });
  });
});


/*Дата и месяц */
window.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("yearSelect");
  const monthSelect = document.getElementById("monthSelect");

  const currentYear = new Date().getFullYear();
  const startYear = 1980;

  // Заполняем список годов (от 1980 до текущего года)
  for (let y = currentYear; y >= startYear; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }

  // Месяцы на русском
  const months = [
    "Январь", "Февраль", "Март", "Апрель",
    "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  // Заполняем список месяцев
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1; // значение от 1 до 12
    option.textContent = month;
    monthSelect.appendChild(option);
  });
});
