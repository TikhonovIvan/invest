window.addEventListener("load", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const circles = document.querySelectorAll(".circle");
  const stepCount = document.querySelectorAll(".step-count");
  const progressSegments = document.querySelectorAll(".progress-segment");

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
    // Ищем контейнеры изображений для текущей активной формы
    const imageContainerInvest = activeForm.querySelector('#imageContainerInvest');
    const imageContainerBiz = activeForm.querySelector('#imageContainerBiz');
    
    // Проверяем, какой контейнер существует в текущей форме
    const activeImageContainer = imageContainerInvest || imageContainerBiz;
    if (!activeImageContainer) return false;
    
    // Ищем загруженные изображения (исключаем input[type="file"])
    const uploadedImages = activeImageContainer.querySelectorAll('.add-image img');
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

      // Обновляем кружки для всех версий
      document.querySelectorAll(`.circle[data-step="${i}"]`).forEach(circle => {
        circle.classList.toggle("complete", stepFilled);
      });
    }

    // Обновляем сегменты прогресса для всех версий
    document.querySelectorAll('.progress-segment').forEach((segment, index) => {
      segment.classList.toggle('active', index < completedSteps);
    });

    // Обновляем номер шага для всех версий
    stepCount.forEach(el => {
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
    btn.addEventListener("click", (e) => {
      e.preventDefault();
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
    
    // Наблюдаем за обоими возможными контейнерами изображений
    const imageContainerInvest = document.querySelector('#imageContainerInvest');
    const imageContainerBiz = document.querySelector('#imageContainerBiz');
    
    if (imageContainerInvest) {
      observer.observe(imageContainerInvest, {
        childList: true,
        subtree: true
      });
    }
    
    if (imageContainerBiz) {
      observer.observe(imageContainerBiz, {
        childList: true,
        subtree: true
      });
    }
  }

  // Инициализация
  resetSteps();
  observeImages();

  // Обработчики для всех возможных инпутов загрузки изображений
  document.querySelectorAll('#imageInputInvest, #imageInputBiz').forEach(input => {
    input.addEventListener('change', function() {
      setTimeout(updateProgress, 300); // Даем время на обработку изображения
    });
  });
});


/**
 * Заполняет селекты годов и месяцев
 * @param {string} yearSelectId - ID селекта годов
 * @param {string} monthSelectId - ID селекта месяцев
 */
function initDateSelects(yearSelectId, monthSelectId) {
  const yearSelect = document.getElementById(yearSelectId);
  const monthSelect = document.getElementById(monthSelectId);

  // Очищаем дефолтные option (если они есть)
  yearSelect.innerHTML = '<option disabled selected>Год</option>';
  monthSelect.innerHTML = '<option disabled selected>Месяц</option>';

  // Заполняем годы (от 1980 до текущего)
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1980; y--) {
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

  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1; // 1-12
    option.textContent = month;
    monthSelect.appendChild(option);
  });
}

// Инициализируем для обеих форм
document.addEventListener("DOMContentLoaded", () => {
  initDateSelects("yearSelectInvest", "monthSelectInvest"); // Для Инвестиции
  initDateSelects("yearSelectBiz", "monthSelectBiz");       // Для Бизнес-маркета
});