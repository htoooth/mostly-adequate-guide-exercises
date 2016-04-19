'use strict'

let _ = require("ramda")

// 示例数据
var CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
];

// 1

let isLastInStock = _.compose(_.prop("in_stock"), _.last)
console.log(isLastInStock(CARS))

// 2

let nameofFirstCar = _.compose(_.prop("name"), _.head)
console.log(nameofFirstCar(CARS))

// 3
let _average = (xs) => _.reduce(_.add, 0, xs) / xs.length

var averageDollarValue = function(cars) {
  var dollar_values = map(function(c) {
    return c.dollar_value;
  }, cars);
  return _average(dollar_values);
};

let averageDollarValueNew = _.compose(_average, _.map(_.prop("dollar_value")))
console.log(averageDollarValueNew(CARS))

// 4
let _underscore = _.replace(/\W+/g, '_')
let sanitizeNames = _.map(_underscore)
console.log(sanitizeNames(["Hello World"]))

// Bonus 1

// let availablePrices = function(cars) {
//   let available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x) {
//     return accounting.formatMoney(x.dollar_value);
//   }).join(', ');
// };

let formatMoney = x => `0000${x.dollar_value}`;
let availablePricesNew = _.compose(_.join(', '), _.map(formatMoney), _.filter(_.prop('in_stock')))
console.log(availablePricesNew(CARS))

// Bonus 2

// var fastestCar = function(cars) {
//   var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
//   var fastest = _.last(sorted);
//   return fastest.name + ' is the fastest';
// };
// 
let append = _.flip(_.concat)
let fastestCar = _.compose(append(" is the fastest"),
                            _.prop("name"),
                            _.last,
                            _.sortBy(_.prop("horsepower")));
console.log(fastestCar(CARS))
