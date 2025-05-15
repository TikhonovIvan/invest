/*Активны или не активные объявления*/ 
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        // Скрываем все табы
        document.querySelectorAll('.tab-content').forEach(tab => {
          tab.classList.remove('show');
        });
        
        // Показываем выбранный таб
        const tabToShow = document.querySelector(`.${this.dataset.tab}-cards`);
        tabToShow.classList.add('show');
      });
    });
    
    // По умолчанию показываем активные карточки
    document.querySelector('.aktive-cards').classList.add('show');
  });