const btnAutoCalibrate = document.querySelector("#calibrateConfirm"),
  btnManualCalibrate = document.querySelector("#calibrateManual"),
  selectGsSection = document.querySelector(".selectGS"),
  autoCalibrateSection = document.querySelector(".autocalibrate"),
  manualCalibrateSection = document.querySelector(".manualcalibrate"),
  autoCalibrateButton = document.querySelector("#autocalibrateResult"),
  resultZone = document.querySelector("#calibrate__result"),
  alertZone = document.querySelector("#calibate__alert"),
  unSelectFuelType = document.querySelector("#unSelectFuelType");
let gsId;

for (key in gsDB) {
  const option = document.querySelector("#gsID");
  if (!(gsDB[key].tables == undefined)) {
    const gs = `<option value="${key}">АЗС№ ${gsDB[key].gsId} "${gsDB[key].gsFirm}"</option>`;
    option.insertAdjacentHTML("beforeend", gs);
  }
}
// Autocalibrate function
const autoCalibrate = (height, tank) => {
  const levelHi = Math.ceil(height),
    levelLow = Math.floor(height);

  if (height % 1) {
    afterRound = +(height + "").split(".")[1].substr(0, 1);
  } else {
    afterRound = 0;
  }

  const tail =
    ((tank.capacityTable[levelHi] - tank.capacityTable[levelLow]) / 10) *
    afterRound;

  let autoCalibrateResult = Math.round(
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
  gsId = document.querySelector("#gsID").value;
  if (gsId === "unSelect") {
    alertZone.innerHTML = `Не выбрана АЗС </br></br><a href="/tools/calibrate/calibrate.html" class="btn back-btn manual__back-btn">← Вернуться назад</a>`;
    resultZone.scrollIntoView();
  } else autoCalibrateSection.classList.toggle("display-none");

  for (key in gsDB[gsId].tables) {
    const option = document.querySelector("#autocalibrateFuelType");
    const tables = gsDB[gsId].tables;
    const fuel = `<option value="${key}">${tables[key].tankId}. ${tables[key].type} </option>`;
    option.insertAdjacentHTML("beforeend", fuel);
  }
});
btnManualCalibrate.addEventListener("click", () => {
  selectGsSection.classList.toggle("display-none");
  manualCalibrateSection.classList.toggle("display-none");
});

// Auto Calibrate
document
  .querySelector(".autocalibrate__form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    resultZone.innerHTML = ``;
    alertZone.innerHTML = ``;

    const autoCalibrateInputHeight = document.querySelector(
        "#autocalibrateHeight"
      ).value,
      autocalibrateType = document.querySelector(
        "#autocalibrateFuelType"
      ).value;
    if (autocalibrateType === "unSelect") {
      alertZone.innerHTML = `Выберите вид топлива!`;
      alertZone.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    } else {
      let calculate = autoCalibrate(
        autoCalibrateInputHeight,
        gsDB[gsId].tables[autocalibrateType]
      );
      const tank = gsDB[gsId].tables[autocalibrateType];
      const tubeCheck = document.querySelector("#tubeCheck").checked;
      if (!tubeCheck) {
        calculate -= tank.tube;
      }

      // Minimal Capacity Test
      if (calculate <= tank.minCapcity) {
        alertZone.innerHTML = `Внимание, остаток топлива ниже мёртвого остатка! (${tank.minCapcity}л.)`;
      }

      // Maximum capacity Test, Type Test
      if (calculate) {
        resultZone.innerHTML = `Объём топлива = ${calculate}л. </br></br><a href="/tools/calibrate/calibrate.html" class="btn back-btn manual__back-btn">← Вернуться назад</a>`;
      } else {
        alertZone.innerHTML = `Введите корректное значение!`;
      }
      alertZone.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  });

// Manual Calibrate
document
  .querySelector(".manualcalibrate__form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    resultZone.innerHTML = ``;
    alertZone.innerHTML = ``;
    const manualCalibrateHeight =
        document.querySelector("#maunualHeight").value,
      manualCalibrateCapacityHi = document.querySelector("#manualCapHi").value,
      manualCalibrateCapacityLow =
        document.querySelector("#manualCapLow").value,
      manualCalibrateTube = document.querySelector("#manualTube").value,
      calculate = manualCalibrate(
        manualCalibrateHeight,
        manualCalibrateCapacityHi,
        manualCalibrateCapacityLow,
        manualCalibrateTube
      );
    if (calculate) {
      resultZone.innerHTML = `Объём топлива = ${calculate}л. </br></br><a href="/tools/calibrate/calibrate.html" class="btn back-btn manual__back-btn">← Вернуться назад</a>`;
    } else {
      alertZone.innerHTML = `Введите корректное значение!`;
    }
    resultZone.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  });
