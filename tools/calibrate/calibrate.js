const btnAutoCalibrate = document.querySelector("#calibrateConfirm"),
  btnManualCalibrate = document.querySelector("#calibrateManual"),
  selectGsSection = document.querySelector(".selectGS"),
  autoCalibrateSection = document.querySelector(".autocalibrate"),
  manualCalibrateSection = document.querySelector(".manualcalibrate"),
  autoCalibrateButton = document.querySelector("autocalibrateResult");
let gsId;

// Autocalibrate function
const autoCalibrate = (height, tank) => {
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

  const autoCalibrateResult = Math.round(
    tank.capacityTable[levelLow] + tank.tube + tail
  );

  return autoCalibrateResult;
};

// Manual calibrate function
const manualCalibrate = (height, capacityHi, capacityLow, tube) => {
  if (+height - Math.round(+height) != 0) {
    const tail = "" + height.split(".")[1][0].substr(0, 1);
    return Math.round(
      (((+capacityHi - +capacityLow) / 10) * tail * 100) / 100 +
        +tube +
        +capacityLow
    );
  } else {
    return +tube + +capacityLow;
  }
};

// Diable default events
document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
});

// Class togglers
btnAutoCalibrate.addEventListener("click", () => {
  selectGsSection.classList.toggle("display-none");
  autoCalibrateSection.classList.toggle("display-none");
  gsId = document.querySelector("#gsID").value;
});

btnManualCalibrate.addEventListener("click", () => {
  selectGsSection.classList.toggle("display-none");
  manualCalibrateSection.classList.toggle("display-none");
});

document
  .querySelector(".autocalibrate__form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const autoCalibrateInputHeight = document.querySelector(
      "#autocalibrateHeight"
    ).value;
    const autocalibrateType = document.querySelector(
      "#autocalibrateFuelType"
    ).value;
    const calculate = autoCalibrate(
      autoCalibrateInputHeight,
      gsDB[gsId].tables[autocalibrateType]
    );
    document.querySelector(
      "#calibrate__result"
    ).innerHTML = `Объём топлива = ${calculate}л.`;
    document.querySelector("#calibrate__result").scrollIntoView();
  });

document
  .querySelector(".manualcalibrate__form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const manualCalibrateHeight =
      document.querySelector("#maunualHeight").value;
    const manualCalibrateCapacityHi =
      document.querySelector("#manualCapHi").value;
    const manualCalibrateCapacityLow =
      document.querySelector("#manualCapLow").value;
    const manualCalibrateTube = document.querySelector("#manualTube").value;
    const calculate = manualCalibrate(
      manualCalibrateHeight,
      manualCalibrateCapacityHi,
      manualCalibrateCapacityLow,
      manualCalibrateTube
    );
    document.querySelector(
      "#calibrate__result"
    ).innerHTML = `Объём топлива = ${calculate}л. </br></br><a href="/tools/calibrate/calibrate.html" class="btn back-btn manual__back-btn">← Вернуться назад</a>`;
    document.querySelector("#calibrate__result").scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  });
