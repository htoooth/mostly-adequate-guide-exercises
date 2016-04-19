'use strict'

let _ = require("ramda")
let curry = _.curry

// exercise 1
let words = _.split(' ')

// exercise 2

let sentences = _.map(words)

// exercise 3
// 

let filterQs = _.filter(_.match(/q/i));

// exercise 4

let _keepHighest = (x, y) => x >= y ? x : y

let max = xs => _.reduce((acc, x) => _keepHighest(acc, x), -Infinity, xs)

let max2 = _.reduce(_keepHighest, -Infinity)
