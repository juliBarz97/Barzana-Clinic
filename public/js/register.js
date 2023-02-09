window.onload = function () { 
        
    // max date for birthdate

    flatpickr('#birthdate', 
    {      
        dateFormat: "d-m-Y",
        maxDate: "today",
        defaultDate: ["01-01-2000"]
    })


    var formulario = document.getElementById('Register');
    var input_password = document.getElementById('password');
    var input_cpassword = document.getElementById('cPassword');
   
    formulario.addEventListener('submit',function(event){ 
        event.preventDefault();
        funcion_comprobacion();
    })


    function funcion_comprobacion(){
        console.log(   "// ",input_cpassword.value.length)
        if  (input_password.value != input_cpassword.value ) {
            document.querySelector('#emailHelp').innerHTML = "Both of your passwords must match."
            document.querySelector('#emailHelp').style.color = "red"
            document.querySelector('#emailHelp').style.fontSize = "large"
            document.querySelector('#password').style.borderColor = "red"
            document.querySelector('#cPassword').style.borderColor = "red"
            document.querySelector('#password').style.backgroundColor = "#FFCFC4"
            document.querySelector('#cPassword').style.backgroundColor = "#FFCFC4"
        } else if ( findTotalCount(input_cpassword.value) < 3 || findTotalCount(input_password.value) < 3) {
            document.querySelector('#emailHelp').innerHTML = "Your password must have 3 numbers."
            document.querySelector('#emailHelp').style.color = "red"
            document.querySelector('#emailHelp').style.fontSize = "large"
            document.querySelector('#password').style.borderColor = "red"
            document.querySelector('#cPassword').style.borderColor = "red"
            document.querySelector('#password').style.backgroundColor = "#FFCFC4"
            document.querySelector('#cPassword').style.backgroundColor = "#FFCFC4"
        } else if ( input_cpassword.value.length < 8 || input_password.value.length < 8 ) {
            document.querySelector('#emailHelp').innerHTML = "Your password must have 8 characters minimun."
            document.querySelector('#emailHelp').style.color = "red"
            document.querySelector('#emailHelp').style.fontSize = "large"
            document.querySelector('#password').style.borderColor = "red"
            document.querySelector('#cPassword').style.borderColor = "red"
            document.querySelector('#password').style.backgroundColor = "#FFCFC4"
            document.querySelector('#cPassword').style.backgroundColor = "#FFCFC4"
        } else {
          formulario.submit(); // se realiza el submit (va para el backend con los campos validados)
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
   
}
 // show password
function myFunction() {
    var x = document.getElementById("password");
    var xc = document.getElementById("cPassword")
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    if (xc.type === "password") {
        xc.type = "text";
      } else {
        xc.type = "password";
    }
  }
