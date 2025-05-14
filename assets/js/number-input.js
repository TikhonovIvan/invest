document.querySelectorAll(".invest-block-uch-number").forEach(block => {
  const input = block.querySelector(".founders-count-input");
  const incrementBtn = block.querySelector(".increment-btn");
  const decrementBtn = block.querySelector(".decrement-btn");

  incrementBtn.addEventListener("click", () => {
    input.value = parseInt(input.value) + 1;
  });

  decrementBtn.addEventListener("click", () => {
    if (parseInt(input.value) > parseInt(input.min)) {
      input.value = parseInt(input.value) - 1;
    }
  });
});
