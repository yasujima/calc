/**
 $Id$

 execute basic arithmetic operations.

 Expr ::= Term { ("+" | "-") Term }
 Term ::= Fact { ("*" | "/") Fact }
 Fact ::= "(" Expr ")" | "+" Fact | "-" Fact | digit

 parser impl referred to:
 http://d.hatena.ne.jp/h_sakurai/20060119

 call Calc.exec, or calc(str) for node.js.
*/

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
Calc.Tokens = function(str) {
  this.tokens = (function(str){
                   var regex = /\d+\.\d+(?:e[+\-]?\d+)?|\d+(?:e[+\-]?\d+)?|[+\-*/()]/img;
                   var tokens = str.match(regex);
                   return tokens;
                 })(str);
  this.pos = 0;
  this.get = function() {return this.tokens[this.pos++];};
  this.peek = function() {return this.tokens[this.pos];};
};
Calc.exec = function(str) {
  var tokens = new Calc.Tokens(str);
  console.dir(tokens.tokens);

  var expr = function() {
    var c = term();
    while (/[+\-]/.test(tokens.peek())) {
      c = Calc.opes[tokens.get()](c, term());
    }
    return c;
  };
  var term = function() {
    var c = fact();
    while (/[*/]/.test(tokens.peek())) {
      c = Calc.opes[tokens.get()](c, fact());
    }
    return c;
  };
  var fact = function() {
    var c = tokens.get();
    if (/\d+/.test(c)) {
      return Number(c);
    }
    if (/[+\-]/.test(c)) {
      return Number(c==="-"?-fact():fact());
    }
    if (c === "(") {
      c = expr();
      if (tokens.get() !== ")") throw "invalid parentheses";
      return c;
    }
    throw "exec error";
  };
  return expr();
};

Calc.usage = function() {
  return "Usage: a calculator. usable + - * / and () operation.";
}

// node.js drive.
exports.calc = Calc.exec;
