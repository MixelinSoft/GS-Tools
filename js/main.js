//Запрашиваем данные с

let meterHeigth = prompt("Введите высоту топлива с метрштока до запятой");
let meterTail = prompt("Введите число после запятой");
//Запрашиваем данные с калибровочной

let tubeCapacity = prompt("Введите объём трубопровода");
let higCapacity = prompt("Введите верхнее значение из калибровочной таблицы ");
let lowCapacity = prompt("Введите нижнее значение из калибровочной таблицы");

//Просчитываем объём
fullCapacity =
  ((+higCapacity - +lowCapacity) / 10) * +meterTail +
  +lowCapacity +
  +tubeCapacity;

//Выводим результат
document.write(`Обьём топлива ${fullCapacity}`);
