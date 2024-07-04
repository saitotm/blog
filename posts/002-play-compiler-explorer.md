---
title: Compiler ExplorerのOpt Pipelineで遊ぶ
description: Compiler ExplorerのOpt Pipelineを使って、未定義動作を観察する。
date: 2024-07-04
---

## Compiler ExplorerのOpt Pipeline
[Compiler Explorer](https://gcc.godbolt.org/)は、Web上でコンパイラの挙動を確認できるサービスです。
例えば、次のようにC++のコードを入力すると、コンパイラが出力するアセンブリを見ることができます。
最適化具合を確認するのに便利です。

![Compiler Explorer](https://saitotm.github.io/blog/002/compiler-explorer.png)

このCompiler Explorerですが、備わっている機能はアセンブリを見る機能だけではありません。
コンパイラをclangにすると、コンパイラの最適化の過程を可視化する**Opt Pipeline**という機能が利用できます。

![Opt pipeline](https://saitotm.github.io/blog/002/opt-pipeline.png)
左のサイドバーから最適化過程を一つクリックすると、その前後の最適化による変化が出力されます。

## Opt Pipelineで未定義動作が最適化される様子を観察

配列の範囲外参照が未定義動作であり、これに伴いコンパイラの最適化の結果が変わることがあります。
例えば、次のようなコードがあった場合に、最適化により関数は画像の通り任意の値にtrueを返すようになります。

![Image](https://saitotm.github.io/blog/002/undefined.png)

array[4]にアクセスするのは未定義動作であるため、コンパイラはこれが起きないと仮定できます。
そのため、array[4]へのアクセスが発生する前にループが終了すると仮定できるので、trueを返すように最適化されます。


ところで、ループによって最終的にarray[4]にアクセスするという事実はどのような仕組みで検知しているのでしょうか？
コンパイル時にループ内で配列の範囲外参照が発生していることを検知するのは一般には難しそうです。

ここで、Compiler ExplorerのOpt Pipelineの出番です。
Opt Pipelineを使用すれば、コンパイラがどのような最適化を行っているかを可視化できます。
上のコードのOpt Pipelineを見てみると、LoopFullUnrollPassでループがアンロールされています。

![Image](https://saitotm.github.io/blog/002/loop-full-unroll-pass.png)

ループがアンロールされた結果、array[4]へのアクセスが直に書かれるようになり、コンパイラが未定義動作を検知できるようになっています。

逆に言えば、ループがアンロールされない場合には、常にtrueを返すような最適化は行われないはずです。
そこで、次のようにループの長さを変えてみると、ある長さまでは常にtrueを返すが、それを超えるとそのような最適化がされなくなることがわかります。
![Image](https://saitotm.github.io/blog/002/opt1.png)
![Image](https://saitotm.github.io/blog/002/opt2.png)

このように、Opt Pipelineを使用することで、コンパイラがどのような最適化を行っているかを観察することができます。
Compiler Explorerには他にも様々な機能があるので、興味があれば使ってみると面白いです。
