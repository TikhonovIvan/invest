  const input = document.getElementById("foundersCount");
  const incrementBtn = document.getElementById("increment");
  const decrementBtn = document.getElementById("decrement");

  incrementBtn.addEventListener("click", () => {
    input.value = parseInt(input.value) + 1;
  });

  decrementBtn.addEventListener("click", () => {
    if (parseInt(input.value) > parseInt(input.min)) {
      input.value = parseInt(input.value) - 1;
    }
  });
