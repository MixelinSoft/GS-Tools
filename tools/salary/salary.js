const form = document.querySelector(".form"),
  resultZone = document.querySelector("#calibrate__result");

form.addEventListener("submit", (e) => {
  resultZone.innerHTML = "";
  e.preventDefault();
  let hours = +document.querySelector("#hours").value,
    oneHour = +document.querySelector("#hour").value,
    litres = +document.querySelector("#litres").value,
    oneLiter = +document.querySelector("#liter").value;
  let result = calculateSalary(hours, oneHour, litres, oneLiter);
  resultZone.innerHTML = `Ваша зарплата - ${result} грн.`;
});

function calculateSalary(hours, oneHour, litres, oneLiter) {
  return Math.round(hours * oneHour + litres * oneLiter);
}
