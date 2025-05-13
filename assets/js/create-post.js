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
    // Обновить активную форму заново (особенно после переключения вкладок)
    activeForm = document.querySelector(".tab-content.active");
    const allSteps = activeForm.querySelectorAll(".form-step");

    allSteps.forEach((step) => step.classList.remove("active", "hidden"));

    if (window.innerWidth <= 425) {
      allSteps.forEach((step) => step.classList.add("hidden"));
      const current = activeForm.querySelector(`.form-step[data-step="${currentStep}"]`);
      if (current) {
        current.classList.remove("hidden");
        current.classList.add("active");
      }
    }

    updateProgress();
  }

  function updateProgress() {
    let completedSteps = 0;

    // Проверяем заполненность каждого шага
    for (let i = 1; i <= 3; i++) {
      const stepFields = activeForm.querySelectorAll(`.form-step[data-step="${i}"] input`);
      const filled = Array.from(stepFields).every(input => input.value.trim() !== "");
      if (filled) completedSteps++;

      // Обновление круга
      circles.forEach((circle) => {
        if (+circle.dataset.step === i) {
          circle.classList.toggle("complete", filled);
        }
      });
    }

    // Обновление прогресс-бара
   
segments.forEach((segment, i) => {
  if (i < completedSteps) {
    segment.classList.add("active");
  } else {
    segment.classList.remove("active");
  }
});

    // Обновление номера текущего шага
    stepCount.forEach((el) => {
      el.textContent = currentStep;
    });

    // Обновление состояния кнопки "Продолжить"
    const currentFields = activeForm.querySelectorAll(`.form-step[data-step="${currentStep}"] input`);
    const allCurrentFilled = Array.from(currentFields).every(input => input.value.trim() !== "");

    const nextBtn = activeForm.querySelector(`.form-step[data-step="${currentStep}"] .next-btn`);
    if (nextBtn) {
      nextBtn.disabled = !allCurrentFilled;
      nextBtn.style.opacity = allCurrentFilled ? 1 : 0.5;
      nextBtn.style.cursor = allCurrentFilled ? "pointer" : "not-allowed";
    }
  }

  // Кнопки "Продолжить"
  document.querySelectorAll(".next-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentFields = activeForm.querySelectorAll(`.form-step[data-step="${currentStep}"] input`);
      const allFilled = Array.from(currentFields).every(input => input.value.trim() !== "");
      if (allFilled && currentStep < 3) {
        currentStep++;
        updateSteps();
      }
    });
  });

  // Отслеживание ввода в поля
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateProgress);
  });

  resetSteps(); // Стартовая инициализация
});
