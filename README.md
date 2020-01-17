js で実装した、四則演算。parser/evalの練習。



# Javascript Calculator Manual

javascriptで動く4則演算計算機です。  
対応するオペレータは、+, -, *, /, 及び ()です。  

## ファイル
 
github からの pull あるいは圧縮ファイルを展開すると
以下のファイルが展開されます。

* Calc.js

  Calculator本体です。

* calc.html

  webブラウザから起動するためのhtmlファイル

* drive.js

  cli driver

* test.js

  test code

## 起動方法

* ブラウザで起動する場合

  calc.htmlをブラウザで開く。
  
* CLI で起動する場合(linuxでの例)

  `$ ./driver.js "1+2+3"`

## 操作方法(ブラウザで起動した場合)

入力ボックスに、計算式を入れ、"exec"ボタンをクリックします。
入力ボックスに結果の値が表示されます。

    入力例： [ 1*(2+3) ]

また、ボックスの下段に、計算式の履歴が表示されます。
対応するオペレータは、+, -, *, /, 及び ()です。  

## 制限事項

認識できない数式、0による除算、桁あふれが発生した場合、
アラートダイヤログが表示されます。

計算可能な最大桁はE+308であり、
これはJavascript言語のNumber.MAX_VALUEで制限されるものです。

有効桁数は、Javascriptに依存します。
つまり、丸め誤差が発生します。

## 動作確認環境

* Firefox 11.0
* Chrome 17.0.963.56
* node.js v0.6.1 (CentOS 5.8)

## repository

https://github.com/yasujima/calc.git
