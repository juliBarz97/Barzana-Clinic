window.addEventListener("submit", (e) => {
  var passForm = document.getElementById("password");
  var passValid = document.querySelector(".pass-valid");

  if (passForm == "") {
    passValid.innerHTML = "Please write your password.";
  }
});
// show password function
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function findTotalCount(str) {
  let count = 0;

  for (let ch of str) {
    if (ch >= "0" && ch <= "9") {
      count++;
    }
  }
  return count;
}
