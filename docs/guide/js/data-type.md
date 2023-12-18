---
title: JS数据类型
titleTemplate: JS基础
---
# JS数据类型
JS的数据类型存在以下两个特点：
- **动态类型**。JS中的变量与任何特定值类型没有任何关联，任何变量都可以被赋予（和重新赋予）各种类型的值。
- **弱类型**。当操作涉及不匹配的类型时，它允许隐式类型转换，而不是抛出类型错误。
## 原始值与非原始值
原始值：类型定义了表示在语言最低层面的**不可变值**。我们将这些值称为原始值。
> Number、String、Boolean、Null、Undefined、BigInt、Symbol  
> **不可变值**表示值不能被更改，但是可以被重新赋值

非原始值：除了原始值之外的值都是原始值。
> Object 和 Array、Math...  
> Object 之外的非原始值, Object 都在其原型链上

## 类型检测
1. typeof 运算符返回一个字符串，表示操作数的类型。能识别 Number、String、Boolean、Undefined、Function、Object。
2. instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。只能判断实例对象。
3. constructor 是对象原型下一个属性，存放创建该实例对象的构造函数。无法判断 null 和 undefined ，而且 constructor 是可以修改的，会导致检查结果不准确。
4. Object.prototype.toString 是对象原型下的方法，返回固定字符串格式为 "[object 类型]"。是最通用最准确的类型检测方法。

## 类型转换
由于JS的弱类型特点，意味着经常可以使用与预期类型不同类型的值，并且将为你转换它为正确的类型。
#### 数字强制转换
数字包含两种数据类型，Number和BigInt，二者的强制转换近乎一致，如果是 Number 强制转化：
- Number 将原样返回
- undefined 转换 NaN
- null 转换为 0
- true 转换为 1; false 转换为0
- 字符串如果其值可以解析为数字字面量，则转换为该数字，反之则转换为 NaN 
  - Infinity 和 -Infinity 被当作是字面量。它们是全局变量。
  - 空字符串或仅包含空格的字符串转换为 0。
- BigInt 抛出 TypeError，以防止意外的强制隐式转换导致精度损失。
- Symbol 抛出 TypeError。
- 对象首先通过按顺序调用它们的 \[@@toPrimitive\](number)、valueOf() 和 toString() 方法将其转换为原始值。然后将得到的原始值转换为数字。

如果是 BigInt 强制转换，则将 BigInt 原样返回，Number 抛出 TypeError。  
如果是数字强制转换，则将 BigInt 和 Number 都原样返回
#### 字符串强制转换
- 字符串按原样返回。
- undefined 转换成 "undefined"。
- null 转换成 "null"。
- true 转换成 "true"；false 转换成 "false"。
- 使用与 toString(10) 相同的算法转换数字。
- 使用与 toString(10) 相同的算法转换 BigInt。
- Symbol 抛出 TypeError。
- 对象首先通过依次调用其 \[@@toPrimitive\](string)、toString() 和 valueOf() 方法将其转换为原始值。然后将生成的原始值转换为一个字符串。
#### 布尔值强制转换
- +0、-0、NaN 转换为 false
- '' 转换为 false
- null 转换为 false
- undefined 转换为 false
- 其他均转换为 true
#### 原始值强制转换
如果值已经是原始值，则不会进行原始值强制转换操作，而是根据转换需要执行以上的转换操作  
如果是对象将依次调用它的 \[@@toPrimitive\](default)、valueOf() 和 toString() 方法，将其转换为原始值。

**特殊说明**：\[@@toPrimitive\] 不是一定存在，但是如果存在，则必然会首先调用并将原始值返回，如果返回对象，会导致 TypeError
