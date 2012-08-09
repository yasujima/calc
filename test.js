#!/usr/local/bin/node

/**************************************************
 単体試験
 **************************************************/
var assert = require('assert');
var calc = require("./Calc.js").calc;

/* uni */
assert.equal(calc("10"), 10);
assert.equal(calc("-10"), -10);
/* plus */
assert.equal(calc("1+2"), 3);
assert.equal(calc("1+0"), 1);
assert.equal(calc("0+1"), 1);
assert.equal(calc("10+20"), 30);
assert.equal(calc("-1+2"), 1);
/* minus */
assert.equal(calc("2-1"), 1);
assert.equal(calc("1-2"), -1);
assert.equal(calc("0-1"), -1);
assert.equal(calc("1-0"), 1);
assert.equal(calc("-1-2"), -3);
assert.equal(calc("10-20"), -10);
/* multiply */
assert.equal(calc("2*1"), 2);
assert.equal(calc("2*0"), 0);
assert.equal(calc("0*3"), 0);
assert.equal(calc("1-0"), 1);
assert.equal(calc("-1-2"), -3);
assert.equal(calc("10-20"), -10);
/* divition */
assert.equal(calc("2/1"), 2);
assert.throws(function() {calc("2/0");});
assert.equal(calc("0/1"), 0);
assert.equal(calc("1/2"), 0.5);
assert.equal(calc("10/3"), 10/3);
/* preference */
assert.equal(calc("2*3+4"), 10);
assert.equal(calc("2+3*4"), 14);
assert.equal(calc("2-3*4"), -10);
/* for tokenize test */
assert.equal(calc("2 + 1 / 4"), 2.25);
assert.equal(calc("2 + 10 * 10 / 2"), 52);
assert.equal(calc("2 + 10 * 10 / 2 - 50"), 2);
/* real number */
assert.strictEqual(calc("0.1 + 0.2"), 0.1+0.2); //BDC 有効精度はjavascript 依存
assert.strictEqual(calc("2.0 + 1.1"), 3.1);
assert.strictEqual(calc("3e10+4e10"), 7e10);
assert.strictEqual(calc("3e-10+4e-10"), 3e-10+4e-10); //有効精度はjavascript 依存
/* parentheses */
assert.equal(calc("2*(3+4)"), 14);
assert.equal(calc("(2+3)*4"), 20);
assert.equal(calc("(2-3)*4"), -4);
assert.equal(calc("10-((2-3)*4)"), 14);
/* invalid operation */
assert.throws(function() {calc("");});
assert.throws(function() {calc("hello");});
assert.throws(function() {calc("1000+y");});
assert.throws(function() {calc("10+(1+1");}); //forget to close ()
/* overflow MAX_VALUE=1.7976931348623157e+308*/
assert.throws(function() {calc("1e308+1e308");});
assert.throws(function() {calc("1e308*10");});
assert.throws(function() {calc("-1e308-1e308");});
assert.doesNotThrow(function() {calc("1.7976931348623157e+308");});
assert.throws(function() {calc("2e+308+1");});