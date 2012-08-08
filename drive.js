#!/usr/local/bin/node

var calc = require("./Calc.js").calc;

var str = process.argv[2];
console.log(calc(str));
