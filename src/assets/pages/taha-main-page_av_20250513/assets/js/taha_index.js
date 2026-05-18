window.addEventListener("resize", function () {
  if (window.innerWidth <= 600) {
    document.getElementById("myTable").classList.add("responsive-table");
  } else {
    document.getElementById("myTable").classList.remove("responsive-table");
  }
});

// Initial check on page load
if (window.innerWidth <= 600) {
  document.getElementById("myTable").classList.add("responsive-table");
}
