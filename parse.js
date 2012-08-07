#!/usr/local/bin/node
//	expr : term { (+|-) term }
//	term : fact { (*|/) fact }
//	fact : number | '(' expr ')'
//<expression>   ::= <term> ('+' <term>)* | <term> ('-' <term>)*
//<term>         ::= <factor> ('*' <factor>)* | <factor> ('/' <factor>)*
//<factor>       ::= '(' <expression> ')' | '+' <expression> | '-' <expression> | <number>

var str = process.argv[2];

function parse(str) {
  var tokens = (function(str) {
                  var regex = /\d+\.\d+(?:e[+\-]?\d+)?|\d+(?:e[+\-]?\d+)?|[+\-*/()]/img;
                  var tokens = str.match(regex);
                  return tokens;})(str);
  console.log(JSON.stringify(tokens));
  var pos = 0;
  var opes = {
    "+" : function (lhs, rhs) {
      var result = lhs + rhs;
      if (isNaN(result) || Math.abs(result) === Infinity) throw "add operation failed, overflow";
      return result;
    },
    "-" : function (lhs, rhs) {
      var result = lhs - rhs;
      if (isNaN(result) || Math.abs(result) === Infinity) throw "minus operation failed";
      return result;
    },
    "*" : function (lhs, rhs) {
      var result = lhs * rhs;
      if (isNaN(result) || Math.abs(result) === Infinity) throw "multiply operation failed";
      return result;
    },
    "/" : function (lhs, rhs) {
      var result = lhs / rhs;
      if (isNaN(result) || Math.abs(result) === Infinity) throw "divide operation failed";
      return result;
    }
  };
  function POP() {
    return tokens[pos++];
  }
  function PUSH(token) {
    tokens.push(token);
  }
  function PEEK() {
    return tokens[pos];
  }
  function EXPR() {
    var c = TERM();
    while (PEEK() == "+"||PEEK()=="-") {
      c = opes[POP()](c, TERM());
    }
    return c;
  }
  function TERM() {
    var c = FACT();
    while(PEEK() == "*" || PEEK() == "/") {
      c = opes[POP()](c, FACT());
    }
    return c;
  }
  function FACT() {
    var c = POP();
    if (c.match(/[0-9]+/)) {
      return Number(c);
    }
    if (c == "(") {
      c = EXPR();
      if (POP() != ")") throw "invalid error";
      return c;
    }
    if (c.match(/[+\-]/)) {
      console.log("....c=" + c);
      var ret;
      if (c=="-") ret = (-EXPR());
      else ret =  EXPR();
      console.log("#### " + ret);
      return ret;
    }
    return "invalid error";
  }
  try {
    return EXPR();
  } catch (e) {
    return e;
  }

}

console.log(parse(str));