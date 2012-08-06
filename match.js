#! /usr/local/bin/node

var str = process.argv[2];

var Operation = function(ope, lhs, rhs) {
  this.ope = ope;
  this.lhs = lhs;
  this.rhs = rhs;
};
var Token = function(str) {
  this.stack = (function(str) {
                  var regex = /\d+\.\d+|\d+|[+\-*/()]/mg;
                  var tokens = str.match(regex);
                  return tokens;}
               )(str);
};

Token.prototype.parse = function() {
  var binary = {'+': 1, '-': 1, '*': 2, '/': 2};
  var resolveParenthesis = function(tokens, start) {
    var nest = 1;
    var token;
    var pos = start;
    while (token = tokens[pos]) {
      if (token === '(') {
        nest++;
      }  else if (token === ')') {
        nest--;
        if (nest === 0) {
          return [pos, parse(tokens, start, pos)];
        }
      }
      pos++;
    }
  };
  var getPriority = function(ope) {
    var p = 0;
    if (ope && binary[ope])
      p = binary[ope];
    return p;
  };
  var parse = function (tokens, pos, len) {
    var stack = [];
    while (pos<len) {
      var token = tokens[pos];
      var lhs;
      if (token === '(') {
        var result = resolveParenthesis(tokens, ++pos);
        pos = result[0];
        lhs = result[1];
      } else if (token.match(/[+\-]/)) {
        lhs = new Operation(token, 0, tokens[++pos]);
      } else {
        lhs = token;
      }
      var ope = tokens[++pos];
      // まず最も優先順位の低い演算子の位置を取得する
      // 演算子がなかった場合は、木構造への分割が完了したとして処理を終える
      // 演算子があった場合は、その演算子を中心に左右の部分式へ分割する
      while (stack.length && getPriority(ope) <= binary[stack[0]]) {
        lhs = new Operation(stack.shift(), stack.shift(), lhs);
      }
      stack.unshift(ope, lhs);
      ++pos;
    }
    return stack.pop();
  };
  return parse(this.stack, 0, this.stack.length);
}

var t = new Token(str);
console.log(" result...." + JSON.stringify(t.parse()));

