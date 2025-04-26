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


