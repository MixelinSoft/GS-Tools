const calibrate = (height, tank) => {
  const levelHi = Math.ceil(height);
  const levelLow = Math.floor(height);

  if (height % 1) {
    afterRound = +(height + "").split(".")[1].substr(0, 1);
  } else {
    afterRound = 0;
  }

  const tail =
    ((tank.capacityTable[levelHi] - tank.capacityTable[levelLow]) / 10) *
    afterRound;

  result = Math.round(tank.capacityTable[levelLow] + tank.tube + tail);

  return result;
};

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputHeight = document.querySelector("#height").value;
  const type = document.querySelector("#fuelType").value;
  const calculate = calibrate(inputHeight, gs16[type]);
  document.querySelector("#result").innerHTML = `Объём топлива = ${calculate}`;
});
