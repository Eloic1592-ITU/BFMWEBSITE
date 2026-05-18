const hideAllTooltips = () => {
  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    tooltip.style.display = "none";
  });
};

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    hideAllTooltips();
    const tooltip = button.querySelector(".tooltip");
    const isVisible = window.getComputedStyle(tooltip).display !== "none";
    if (!isVisible) {
      tooltip.style.display = "block";
    } else {
      tooltip.style.display = "none";
    }
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  const tooltips = document.querySelectorAll(".tooltip");

  if (!target.closest("button") && !target.classList.contains("tooltip")) {
    tooltips.forEach((tooltip) => {
      tooltip.style.display = "none";
    });
  }
});