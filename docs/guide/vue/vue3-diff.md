---
title: Vue diff 算法解析
titleTemplate: Vue
---
# Vue diff 算法
**Diff 算法是 Vue 用于减少真实 Dom 渲染的一种算法，它通过对比新旧虚拟 Dom 树，尽最大可能保留相同节点，找出不同的节点，并将不同的节点 patch 到真实 Dom 上**。

## 为什么需要 diif 算法
通过虚拟DOM改变真正的 DOM 并不比直接操作 DOM 效率更高。恰恰相反，我们仍需要调用 DOM API 去操作 DOM，并且虚拟 DOM 还会额外占用内存！但是，我们可以通过 虚拟 DOM + diff 算法，找到需要更新的最小单位，最大限度地减少真实 DOM 操作，从而提升性能。
1. diff 算法的核心作用是降低渲染器 renderer 的性能消耗。
2. diff 算法通过一系列计算，得到真实 DOM 改动最少的操作。

## Vue3 diff 算法
源码地址：https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts
1. 有两个主要的函数 patchUnkeyedChildren 和 patchKeyedChildren。分别用于不带 key 值的虚拟 Dom 和带 key 值的虚拟 Dom。
2. 对于 patchUnkeyedChildren 直接采用 remove old（删除老节点）和 mount new（挂载新节点）。
3. 对于 patchKeyedChildren 则依次采用：
   1. sync from start（前序对比）
   2. sync from end（后序对比）
   3. common sequence + mount（同序列加挂载）
   4. common sequence + unmount（同序列加卸载）
   5. unknown sequence（乱序对比）

### 术语拓展
1. i ：对比指针
2. c1：旧的孩子节点
3. c2：新的孩子节点
4. e1：旧孩子的尾指针
5. e2：新孩子的尾指针
6. old：旧虚拟节点序列
7. new：新虚拟节点序列
8. s1：未知序列的旧节点指针
9. s2：未知序列的新节点指针
10. 对比条件：**当虚拟节点的 type 和 key 相同则视为同一节点**

### 前序对比
指针 i 从前开始向后对比，当新旧虚拟节点不一致，或双方有一方 i 大于尾指针，停止循环。
例如：ab -> abc
![前序对比](asset/diff/sync-from-start.png "前序对比")
指针，从 a 开始向后比对，比对至 i = 3 时，i 指针 > 旧孩子尾指针 e1 ,结束。

### 后序对比
尾指针 e1 和 e2 从后开始向前对比，当新旧虚拟节点不一致，或双方有一方 i 大于尾指针，停止循环。
例如：ab -> cab
![后序对比](asset/diff/sync-from-end.png "后序对比")

旧节点尾指针 e1，从 b 开始向前比对；  
新节点尾指针 e2，从 b 开始向前比对；
比对至 e1 = -1 时，i 指针 >  旧孩子尾指针 e1 ,结束。

### 同序列加挂载
指针 i 比旧孩子的尾指针 e1 大说明有要新增的，i 和 e2 之间的是新增的节点。
例如：ab -> abc 和 ab -> abcd
![同序列加挂载](asset/diff/common-sequence-mount.png "同序列加挂载")

### 同序列加卸载
指针 i 比新孩子的尾指针 e2 大说明有要卸载的，i 到 e1 之间的就是要卸载的节点。
例如：abc -> ab
![同序列加卸载](asset/diff/common-sequence-unmount.png "同序列加卸载")

### 乱序对比
1. 经过前序对比和后序对比，如果即不满足【同序列+挂载】，也不【同序列+卸载】，则得到【未知序列】
2. 旧节点中的未知序列，为 i 至 e1 之间的节点
3. 新节点中的未知序列，为 i 至 e2 之间的节点
4. build key:index map for newChildren （从新节点的未知序列中，构建序号关系 keyToNewIndexMap）
5. loop through old children left to be patched and try to patch （从旧节点的未知序列中，对比判断是否存在余 keyToNewIndexMap，不存在则移除，存在则记录二者序号关系 newIndexToOldIndexMap）
6. 构建 newIndexToOldIndexMap 的最长递增序列 increasingNewIndexSequence
7. 移动并挂载最长递增序列，遍历新节点未知序列，
   1. 如果其在旧节点未知序列中不存在，则直接新增挂载，
   2. 反之则继续判断，其是否在最长递增序列中，
      1. 如果存在，则不动，
      2. 如果不存在，则根据二者序号关系，从旧节点未知序列将其移动至新节点序列的对应位置。

### 乱序对比稍微复杂一些，直接带入例子从头开始演示，先补充整体流程
1. 前序对比，当新旧虚拟节点不一致，或双方有一方 i 大于尾指针，跳出前序对比
2. 后序对比，当新旧虚拟节点不一致，或双方有一方 i 大于尾指针，跳出后续对比
3. 判断指针 i，和新旧孩子序列的尾指针 e1 和 e2：
   1. i > e1 && i <= e2，则进入同序列 + 挂载
   2. i > e2 && i <= e1，则进入同序列 + 卸载
   3. 不满足以上情况，则进入乱序对比

例子：abcdefg -> abxceyfg
![乱序对比](asset/diff/unknown-sequence.png "乱序对比")

## 最长递增子序列算法
在乱序对比的过程中，提到了一个最长递增子序列，接下来研究其算法原理。

它是对数组的处理，它需要满足两个条件，一个是长，一个是递增。例如：
1. [1, 2, 5, 6, 4]，它的最长递增子序列是 [1, 2, 5, 6]
2. [3, 2, 8, 9, 5, 6, 7, 11, 15]，它的最长递增子序列是 [2, 5, 6, 7, 11, 15]
