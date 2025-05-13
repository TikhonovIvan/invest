const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');
const uploadLabel = imageContainer.querySelector('.custom-file-upload');

imageInput.addEventListener('change', function () {
  const files = Array.from(imageInput.files);
  const currentImageCount = imageContainer.querySelectorAll('.add-image').length;

  if (currentImageCount >= 20) {
    alert('Максимум 20 фотографий');
    return;
  }

  const availableSlots = 20 - currentImageCount;
  const filesToAdd = files.slice(0, availableSlots);

  filesToAdd.forEach(file => {
    if (!file.type.startsWith('image/')) return;

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'add-image';

    const img = document.createElement('img');
    imageWrapper.appendChild(img);
    // Если это первое изображение — добавим метку "Главное фото"
if (imageContainer.querySelectorAll('.add-image').length === 0) {
  const mainLabel = document.createElement('div');
  mainLabel.className = 'main-photo-label';
  mainLabel.textContent = 'Главное фото';
  imageWrapper.appendChild(mainLabel);
}

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.onclick = () => imageWrapper.remove();
    imageWrapper.appendChild(deleteBtn);

    uploadLabel.insertAdjacentElement('afterend', imageWrapper);

    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;

      // ✅ После отображения картинки — накладываем размытие и показываем индикатор
      img.style.filter = 'blur(2px)';

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

      // Запускаем анимацию прогресса
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
          img.style.filter = 'none'; // ✅ Убираем размытие после прогресса
          loaderOverlay.remove();    // ✅ Убираем индикатор загрузки
        }
      }, 200);
    };

    reader.readAsDataURL(file); // ✅ Запускаем загрузку файла
  });

  imageInput.value = '';
});
