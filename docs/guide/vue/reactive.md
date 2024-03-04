---
title: 响应式基础
titleTemplate: Vue3
---
# Vue 响应式原理
本文主要介绍的是 **Vue 的响应式原理**，以及 **Vue2 和 Vue3 实现响应式的方式**。

## 响应式原理
### 响应式
介绍响应式原理，首先需要知道，什么是响应式？响应式解决的是什么问题。先来看一个简单的例子
```javascript
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // 仍然是 3
```
当我们更改 A0 后，A2 并不会自动更新，因为 A2 赋值时，A0 是 1 而不是 2，代码是命令式的，一行代码执行一次，如果期望在打印 A2 时使用更新后的 A0，需要再次调用表达式
```javascript (8)
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
A2 = A0 + A1

console.log(A2) // 4
```
如上所示，重新使用表达式，就可以使其变化。但是，有的时候我们希望，这个公式声明一次就够了，也就是说，我们更希望 ***这个公式更想是一个声明式的公式***，声明了该公式后，A2 就可以随着 A0 的变化而变化，而不是每次改动完 A0，就重新调用一次公式，命令式的去更新。

当然，如果将这种思路带到 MVVM 中，也就是 ***视图层渲染出来的数据应该与视图控制层的变量时刻保持一致***，我们会希望，当我们在视图控制层，更改了变量后，视图层可以立刻渲染出变化后的值，也希望当用户在视图层操作了之后，视图控制层可以根据变化做出响应。

所以什么是响应式？***它是一种可以使我们声明式地处理变化的编程范式。当响应式数据发生变化后，执行一系列函数，使得需要变化的部分跟随响应式数据的变化而变化。***

## Vue2 的响应式系统
官方原文：https://v2.cn.vuejs.org/v2/guide/reactivity.html
1. 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 ***Object.defineProperty*** 把这些 property 全部转为 getter/setter。
2. 每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。
![Vue2响应式原理](asset/vue2-reactive.png "Vue2响应式原理")

官方的说法略微简单，但是在具体实现上，Vue2 用到了几个核心部件：***Observer***、***Dep***、***Watcher***、***Scheduler***。

### Observer
Observer 要实现的目标非常简单，就是把一个普通的对象转换为响应式的对象。
- Observer 把对象的每个属性通过 Object.defineProperty 深度转换为带有 getter 和 setter 的属性。
- Observer 只执行一次，在组件生命周期中，这件事发生在 beforeCreate 之后，created 之前。
- Observer 存在一定的局限性，它只能为遍历时的属性添加响应式，无法监测到将来动态增加或删除的属性
- 为了弥补 Observer 的缺陷，Vue2 提供了 $set 和 $delete 两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。
- 对于数组，Vue2 会更改它的隐式原型，之所以这样做，是因为 Vue2 需要监听那些可能改变数组内容的方法
- 当然，Object.defineProperty 方法本身也存在局限性，它只能拦截 get（获取）和 set（设置）这两种基本语义，对于其他的基本语义，例如：in（属性/继承属性查询）、apply（函数调用）等，无法进行拦截。

### Dep

### Watcher

### Scheduler