---
title: Compiler ExplorerのOpt Pipelineで遊ぶ
description: Compiler ExplorerのOpt Pipelineを使って、未定義動作を観察する。
date: 2024-07-02
---

## Compiler ExplorerのOpt Pipeline
[Compiler Explorer](https://gcc.godbolt.org/)は、Web上でコンパイラの挙動を確認できるサービスです。
例えば、次のようにC++のコードを入力すると、出力されるアセンブリを見ることができます。
![Compiler Explorer](https://saitotm.github.io/blog/002/compiler-explorer.png)

## Opt Pipelineで未定義動作が最適化される様子を観察
