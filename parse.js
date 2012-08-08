#!/usr/local/bin/node

// Expr ::= Term { ("+" | "-") Term }
// Term ::= Fact { ("*" | "/") Fact }
// Fact ::= "(" Expr ")" | "+" Fact | "-" Fact | digit

var str = process.argv[2];

var Calc = {};
Calc.opes = {
  validate : function (result, ope) {
    if (isNaN(result) || Math.abs(result) === Infinity) throw ope + " ope failed";
  },
  "+" : function (lhs, rhs) {
    var result = lhs + rhs;
    this.validate(result, "add");
    return result;
  },
  "-" : function (lhs, rhs) {
    var result = lhs - rhs;
    this.validate(result, "sub");
    return result;
  },
  "*" : function (lhs, rhs) {
    var result = lhs * rhs;
    this.validate(result, "mul");
    return result;
  },
  "/" : function (lhs, rhs) {
    var result = lhs / rhs;
    this.validate(result, "div");
    return result;
  }
};

Calc.exec = function (str) {
  var pos = 0;
  var tokens = (function(str) {
                  var regex = /\d+\.\d+(?:e[+\-]?\d+)?|\d+(?:e[+\-]?\d+)?|[+\-*/()]/img;
                  var tokens = str.match(regex);
                  return tokens;
                })(str);
  console.dir(tokens);
  return expr();

  function get() {
    return tokens[pos++];
  }
  function peek() {
    return tokens[pos];
  }
  function expr() {
    var c = term();
    while (peek() == "+"||peek()=="-") {
      c = Calc.opes[get()](c, term());
    }
    return c;
  }
  function term() {
    var c = fact();
    while(peek() == "*" || peek() == "/") {
      c = Calc.opes[get()](c, fact());
    }
    return c;
  }
  function fact() {
    var c = get();
    if (c.match(/[0-9]+/)) {
      return Number(c);
    }
    if (c.match(/[\-+]/)) {
      return Number(c=="-"?-fact():fact());
    }
    if (c == "(") {
      c = expr();
      if (get() != ")") throw "invalid error";
      return c;
    }
    return "invalid error";
  }

}

console.log(Calc.exec(str));