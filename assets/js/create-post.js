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
    const imageContainer = activeForm.querySelector('#imageContainer');
    if (!imageContainer) return false;
    const uploadedImages = imageContainer.querySelectorAll('img:not([type="file"]), .image-preview');
    return uploadedImages.length > 0;
  }

  function isStepFilled(stepNumber) {
    const stepFields = activeForm.querySelectorAll(`.form-step[data-step="${stepNumber}"] input:required`);
    let filled = Array.from(stepFields).every(input => input.value.trim() !== "");
    
    if (stepNumber === 1) {
      filled = filled && checkImages();
    }
    
    return filled;
  }

  function updateProgress() {
    let completedSteps = 0;
    let allStepsFilled = true;

    for (let i = 1; i <= 3; i++) {
      const stepFilled = isStepFilled(i);
      
      if (stepFilled) {
        completedSteps++;
      } else {
        allStepsFilled = false;
      }

      circles.forEach((circle) => {
        if (+circle.dataset.step === i) {
          circle.classList.toggle("complete", stepFilled);
        }
      });
    }

    segments.forEach((segment, i) => {
      segment.classList.toggle("active", i < completedSteps);
    });

    stepCount.forEach((el) => {
      el.textContent = currentStep;
    });

    // Кнопка "Продолжить"
    const allCurrentFilled = isStepFilled(currentStep);
    const nextBtn = activeForm.querySelector(`.form-step[data-step="${currentStep}"] .next-btn`);
    if (nextBtn) {
      nextBtn.disabled = !allCurrentFilled;
      nextBtn.style.opacity = allCurrentFilled ? 1 : 0.5;
      nextBtn.style.cursor = allCurrentFilled ? "pointer" : "not-allowed";
    }

    // Кнопка "Опубликовать" - проверяем ВСЕ шаги
    const submitBtn = activeForm.querySelector(`.submit-btn`);
    if (submitBtn) {
      submitBtn.disabled = !allStepsFilled;
      submitBtn.style.opacity = allStepsFilled ? 1 : 0.5;
      submitBtn.style.cursor = allStepsFilled ? "pointer" : "not-allowed";
    }
  }

  // Обработка кнопок "Продолжить"
  document.querySelectorAll(".next-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (isStepFilled(currentStep) && currentStep < 3) {
        currentStep++;
        updateSteps();
      }
    });
  });

  // Следим за вводом
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateProgress);
  });

  // Наблюдатель за изменениями изображений
  function observeImages() {
    const observer = new MutationObserver(updateProgress);
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

  document.querySelectorAll('#imageInput').forEach(input => {
    input.addEventListener('change', function() {
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
