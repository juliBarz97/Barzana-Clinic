window.onload = function () {
  var monday = document.getElementById("monday");
  var tuesday = document.getElementById("tuesday");
  var wednesday = document.getElementById("wednesday");
  var thursday = document.getElementById("thursday");
  var friday = document.getElementById("friday");
  var formAddDoc = document.getElementById("Register");
  let count = 0;

  formAddDoc.addEventListener("submit", function (event) {
    event.preventDefault();
    addDoc_func();
  });

  function addDoc_func() {
    if (!monday.checked) {
      count--;
    }
    if (!tuesday.checked) {
      count--;
    }
    if (!wednesday.checked) {
      count--;
    }
    if (!thursday.checked) {
      count--;
    }
    if (!friday.checked) {
      count--;
    }
    if (count == -5) {
      document.querySelector(".text-error").innerHTML =
        "You must select at least 1 day for the doctor.";
      document.querySelector(".text-error").style.color = "#850000";
      document.querySelector(".text-error").style.fontSize = "large";
      document.querySelector("#daysAvailable").style.backgroundColor =
        "#ffe6e0";
      document.querySelector("#daysAvailable").style.border = "9px";
    } else {
      formAddDoc.submit();
    }
  }

  flatpickr("#birthdate", {
    dateFormat: "d-m-Y",
    maxDate: "today",
    defaultDate: ["01-01-2000"],
  });
};
