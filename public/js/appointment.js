

const daysAvailable = document.querySelector('#daysAvailable').innerText
let days = daysAvailable.split(', ')
let numbers = [] 

for (let i = 0 ; i < days.length; i ++ ){ 
                  if (days[i] == "Monday"){ numbers.push(1) } 
                  if (days[i] == "Tuesday"){ numbers.push(2) }
                  if (days[i] == "Wednesday"){ numbers.push(3) } 
                  if (days[i] == "Thursday"){ numbers.push(4) } 
                  if (days[i] == "Friday"){ numbers.push(5) } 
      } 



  flatpickr('#datepicker', 
  {      
      dateFormat: "F j, Y",
      minDate: "today",
      enable: [
        function(date) {
          return numbers.some((element) => date.getDay() == element);
        }
      ]
  })