 const phoneInputField = document.querySelector("#phone");

  const iti = window.intlTelInput(phoneInputField, {
    initialCountry: "kg", // Кыргызстан по умолчанию
    preferredCountries: ["kg", "ru", "kz"],
    separateDialCode: true, // Отображает код страны отдельно
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js", // для форматирования и валидации
  });