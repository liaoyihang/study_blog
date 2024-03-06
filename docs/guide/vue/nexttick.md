---
title: $nextTick 原理
titleTemplate: Vue
---
# nextTick
nextTick 是 Vue 提供的一个 Api，用于执行页面渲染之后的函数

## 作用
Vue 更新 DOM 是异步更新的，数据变化，DOM 的更新不会马上完成，nextTick 的回调是在下次 DOM 更新循环结束之后执行的延迟回调。

简单来说，**当我们需要使用在页面渲染之后再执行的函数，就可以在 nextTick 的回调中调用**。

## 本质
无论是 Vue2 还是 Vue3，它们的 nextTick 函数都没有过多的逻辑，而是**利用了*浏览器* 的事件循环机制**，将回调函数放入任务队列。

## Vue2 源码分析
Vue2 的 nextTick 主要有三部分，flushCallbacks（执行函数）、timerFunc（执行方式）、nextTick。

nextTick 函数本身，就是将回调函数包装成任务，放入 callbacks 数组中，并调用 timerFunc()
```javascript
function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e: any) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

flushCallbacks 函数是具体的执行函数，将函数从 callbacks 中取出执行。
```javascript
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

timerFunc 函数是执行函数的方式，也就是如何将 nextTick 的回调函数放入浏览器的任务队列，Vue2 采用的是逐层降级，根据环境的不同选择不同的下位替代方式。timerFunc 函数的参数就是 flushCallbacks 函数

判断顺序是：Promise -> MutationObserver -> setImmediate -> setTimeout。
```javascript
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```
## Vue3 源码分析
与 Vue2 相比，Vue3 的 nextTick 就显得简单了些，直接将函数放入 Promise.resolve().then，并将 Promise 对象返回
```javascript
function nextTick<T = void, R = void>(
  this: T,
  fn?: (this: T) => R,
): Promise<Awaited<R>> {
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}
```