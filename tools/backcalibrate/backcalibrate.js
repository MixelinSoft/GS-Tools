const selectGSWindow = document.querySelector(".selectGS-window"),
  selectGSForm = document.querySelector(".selectGS-form"),
  calibrateWindow = document.querySelector(".calibrate-window"),
  calibrateForm = document.querySelector("#calibrateForm"),
  alertZone = document.querySelector("#calibate__alert"),
  resultZone = document.querySelector("#calibrate__result"),
  backBtn = document.querySelector("#backToSelect");

// let gsId;

function selectGS() {
  for (key in gsDB) {
    const option = document.querySelector("#gsID");
    if (!(gsDB[key].tables == undefined)) {
      const gs = `<option value="${key}">АЗС№ ${gsDB[key].gsId} "${gsDB[key].gsFirm}"</option>`;
      option.insertAdjacentHTML("beforeend", gs);
    }
  }
  selectGSForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const gsId = document.querySelector("#gsID").value;
    if (gsId === "unSelect") {
      alertZone.innerHTML = `Не выбрана АЗС!`;
      resultZone.scrollIntoView();
    } else {
      createFuelTypesList(gsId);
      windowSwitcher(selectGSWindow, calibrateWindow);
      alertZone.innerHTML = "";
    }
  });
}

function createFuelTypesList(gsId) {
  for (key in gsDB[gsId].tables) {
    const option = document.querySelector("#autocalibrateFuelType"),
      tables = gsDB[gsId].tables,
      fuel = `<option value="${key}">${tables[key].tankId}. ${tables[key].type} </option>`;

    option.insertAdjacentHTML("beforeend", fuel);
  }
  selectFuelType(gsId);
}

function selectFuelType(gsId) {
  calibrateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let fuelType = document.querySelector("#autocalibrateFuelType").value;
    let value = +document
      .querySelector("#calibrateValue")
      .value.replace(",", ".");

    if (fuelType === "unSelect") {
      alertZone.innerHTML = `Не выбран вид топлива!`;
      resultZone.scrollIntoView();
    } else {
      alertZone.innerHTML = "";
      backCalibrate(fuelType, value, gsId);
    }
  });
}

function backCalibrate(type, value, gsId) {
  resultZone.innerHTML = "";

  const table = gsDB[gsId].tables[type].capacityTable,
    tube = gsDB[gsId].tables[type].tube,
    valueWihoutTube = value - tube;

  if (table.includes(valueWihoutTube)) {
    const index = table.indexOf(valueWihoutTube);
    resultZone.innerHTML = `Предполагаемая высота топлива - ${index} см`;
  } else {
    table.forEach((element, index) => {
      if (valueWihoutTube > element && valueWihoutTube < table[index + 1]) {
        let tail = Math.round(
          (valueWihoutTube - element) / ((table[index + 1] - element) / 10)
        );

        resultZone.innerHTML = `Предполагаемая высота топлива - ${index}.${tail} см`;
        resultZone.scrollIntoView();
      }
    });
  }
}

function windowSwitcher(windowHide, windowShow) {
  windowHide.classList.add("display-none");
  windowShow.classList.remove("display-none");
}

selectGS();

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  windowSwitcher(calibrateWindow, selectGSWindow);
  document.querySelector("#calibrateValue").value = "";
});
