const burger = document.querySelector('.burger')

burger.addEventListener('click', function(){
    this.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open');
})



const questionsBoxs = Array.from(document.querySelectorAll(".questions-box"));

questionsBoxs.forEach((box) => {
    box.addEventListener("click", boxHandler);
});

function boxHandler(e) {
    e.preventDefault();
    let currentBox = e.currentTarget;
    let currentContent = currentBox.querySelector(".questions-box-content");

    currentBox.classList.toggle("active");

    if (currentBox.classList.contains("active")) {
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    } else {
        currentContent.style.maxHeight = 0;
    }
}


const links = document.querySelectorAll('.nav-link');
  const currentUrl = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute('href') === currentUrl.split('/').pop()) {
      link.classList.add('active');
    }
  });

// выпадающий список 
document.querySelector('.dropdown-toggle').addEventListener('click', function (e) {
    e.preventDefault();
    const parent = this.parentElement;
    const arrowImg = this.querySelector('img');
    
    parent.classList.toggle('open');
    
    // Меняем изображение в зависимости от состояния
    if (parent.classList.contains('open')) {
        arrowImg.src = "assets/img/login/r2.svg"; // стрелка вверх или другая картинка
    } else {
        arrowImg.src = "assets/img/login/r1.svg"; // исходная картинка
    }
});


