document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  let inputData = new Object();
  inputData.height = document.querySelector("#height").value;
  inputData.capHi = document.querySelector("#capHi").value;
  inputData.capLow = document.querySelector("#capLow").value;
  inputData.tube = document.querySelector("#tube").value;

  if (+inputData.height - Math.round(+inputData.height) != 0) {
    let tail = inputData.height.split(".")[1][0].substr(0, 1);

    let calculate =
      (((+inputData.capHi - +inputData.capLow) / 10) * tail * 100) / 100 +
      +inputData.tube +
      +inputData.capLow;
    document.querySelector(
      "#result"
    ).innerHTML = `Объём топлива = ${calculate}`;
  } else {
    let calculate = +inputData.tube + +inputData.capLow;
    document.querySelector(
      "#result"
    ).innerHTML = `Объём топлива = ${calculate}`;
  }
});
