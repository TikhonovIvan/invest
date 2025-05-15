/**
 * Настройка загрузки изображений для указанных input и container
 * @param {string} inputId - ID input[type="file"]
 * @param {string} containerId - ID контейнера для превью изображений
 */
function setupImageUpload(inputId, containerId) {
  const imageInput = document.getElementById(inputId);
  const imageContainer = document.getElementById(containerId);
  const uploadLabel = imageContainer.querySelector('.custom-file-upload');

  imageInput.addEventListener('change', function () {
    const files = Array.from(imageInput.files);
    const currentImageCount = imageContainer.querySelectorAll('.add-image').length;

    // Проверка лимита (20 изображений)
    if (currentImageCount >= 20) {
      alert('Максимум 20 фотографий');
      return;
    }

    const availableSlots = 20 - currentImageCount;
    const filesToAdd = files.slice(0, availableSlots);

    filesToAdd.forEach(file => {
      if (!file.type.startsWith('image/')) return;

      // Создаем обертку для изображения
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'add-image';

      // Создаем элемент img
      const img = document.createElement('img');
      imageWrapper.appendChild(img);

      // Добавляем метку "Главное фото" для первого изображения
      if (imageContainer.querySelectorAll('.add-image').length === 0) {
        const mainLabel = document.createElement('div');
        mainLabel.className = 'main-photo-label';
        mainLabel.textContent = 'Главное фото';
        imageWrapper.appendChild(mainLabel);
      }

      // Кнопка удаления
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '×';
      deleteBtn.onclick = () => imageWrapper.remove();
      imageWrapper.appendChild(deleteBtn);

      // Вставляем после кнопки загрузки
      uploadLabel.insertAdjacentElement('afterend', imageWrapper);

      // Чтение файла и отображение превью
      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
        img.style.filter = 'blur(2px)';

        // Создаем индикатор загрузки
        const loaderOverlay = document.createElement('div');
        loaderOverlay.className = 'loader-overlay';

        const loaderCircle = document.createElement('div');
        loaderCircle.className = 'loader-circle';
        loaderCircle.innerHTML = `
          <svg width="98" height="98">
            <circle class="loader-bg" cx="49" cy="49" r="45" />
            <circle class="loader-progress" cx="49" cy="49" r="45" />
          </svg>
          <div class="loader-text">0%</div>
        `;

        loaderOverlay.appendChild(loaderCircle);
        imageWrapper.appendChild(loaderOverlay);

        // Анимация прогресса (симуляция)
        let progress = 0;
        const progressCircle = loaderCircle.querySelector('.loader-progress');
        const loaderText = loaderCircle.querySelector('.loader-text');

        const interval = setInterval(() => {
          progress += 10;
          const offset = 307 - (progress / 100) * 307;
          progressCircle.style.strokeDashoffset = offset;
          loaderText.textContent = `${progress}%`;

          if (progress >= 100) {
            clearInterval(interval);
            img.style.filter = 'none'; // Убираем размытие
            loaderOverlay.remove();   // Убираем индикатор
          }
        }, 200);
      };

      reader.readAsDataURL(file);
    });

    imageInput.value = ''; // Сбрасываем input
  });
}

// Инициализация загрузки для обеих форм
document.addEventListener('DOMContentLoaded', () => {
  setupImageUpload('imageInputInvest', 'imageContainerInvest');
  setupImageUpload('imageInputBiz', 'imageContainerBiz');
});