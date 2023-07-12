const confirmBtn = document.querySelector("gsSelectConfirm"),
  selectSection = document.querySelector(".gs-select__section"),
  cardSection = document.querySelector(".gs-card__section"),
  cardTitle = document.querySelector("#gsCardTitle"),
  cardFirm = document.querySelector("#gsCardFirm"),
  cardPhone = document.querySelector("#gsCardNumber"),
  cardAddress = document.querySelector("#gsCardAddress"),
  cardMap = document.getElementById("gsCardMap"),
  cardMapContainer = document.querySelector(".gs-card__map");
(resultZone = document.querySelector("#calibrate__result")),
  (alertZone = document.querySelector("#calibate__alert")),
  (backBtn = document.querySelector("#backJS"));

for (key in gsDB) {
  const option = document.querySelector("#gsID");
  if (!(gsDB[key].phone == undefined)) {
    const gs = `<option value="${key}">АЗС№ ${gsDB[key].gsId} "${gsDB[key].gsFirm}"</option>`;
    option.insertAdjacentHTML("beforeend", gs);
  }
}

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
});

document.querySelector("#gsSelectConfirm").addEventListener("click", () => {
  const option = document.querySelector("#gsID").value;
  alertZone.innerHTML = "";
  if (option === "unSelect") {
    alertZone.innerHTML = `Не выбрана АЗС!`;
  } else {
    const gs = gsDB[option];
    cardTitle.innerHTML = `АЗС №${gs.gsId}`;
    cardFirm.innerHTML = `ТОВ "${gs.gsFirm}"`;
    cardPhone.href = `tel:${gs.phone}`;
    cardPhone.innerHTML = `${gs.phone.substr(0, 3)} (${gs.phone.substr(
      3,
      3
    )}) ${gs.phone.substr(6, 3)}-${gs.phone.substr(9, 2)}-${gs.phone.substr(
      11,
      2
    )}`;
    cardAddress.innerHTML = `${gs.address}`;
    if (gs.gps !== undefined) {
      cardMapContainer.classList.remove("display-none");
      console.log(gs.gps);
      cardMap.src = gs.gps;
    }
    selectSection.classList.toggle("display-none");
    cardSection.classList.toggle("display-none");
  }
});

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cardMap.src = "";
  cardMapContainer.classList.add("display-none");
  selectSection.classList.toggle("display-none");
  cardSection.classList.toggle("display-none");
});
