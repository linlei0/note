## 浏览器中的eventloop
**在了解之前我们先要明白js为什么是单线程？**

因为js是服务于我们的客户端的，如果js是多线程那么就会出现一种情况，如果2个js在并行执行，其中一个js是删除dom，另一个js是改变dom的style
那么就会出现一种情况，我们的dom删除了，而给dom添加style的方法后执行，那么就锤报错，为了避免这样的情况我们的浏览器就实现了eventloop这样的一种解决方案

**eventLoop**

我们可以把非常耗时的任务放在一个异步队列里面，异步队列又分为宏任务和微任务，只有等上一个宏任务里面的微任务全部执行完成才能执行下一个宏任务

**浏览器中的宏任务**
- script
- setTimeout
- setInterval
- requestAnimationFream

**浏览器中的微任务**

promsie(async)

mutationObserver


## 实战
- 1.宏任务和微任务的执行顺序
```js
setTimeout(() => {
  console.log("timeout");
}, 0);
const promise = new Promise(resolve => {
  console.log("promise init");
  resolve(1);
  console.log("promise end");
});
promise.then(res => {
  console.log("promise result:", res);
});
```
结果："promise init"，"promise end"， "promise result:", 1,"timeout"

分析：setTimout是宏任务，Promise是微任务，所以先执行 new Promise构造函数里面的同步状态所以先执行
"promise init"，"promise end"，resolve返回的依然是一个微任务所以下一步执行promise result:", 1，当所有的微任务执行完成后再去执行setTimeout，此时打印timeout


- 2、宏任务微任务交错执行
```js
setTimeout(() => {
  console.log("timeout1");
  Promise.resolve().then(() => {
    console.log("promise1");
  });
}, 0);
Promise.resolve().then(() => {
  console.log("promise2");
  setTimeout(() => {
    console.log("timeout2");
  }, 0);
});
```
结果："promise2" , "timeout1", "promise1", "timeout2"

分析：首先我们知道Promise.resolve()是一个微任务首先执行，所以打印"promise2",同时会触发一个setTimeout这个宏任务，由于之前已经挂起了一个宏任务在异步队列中，所以先执行"timeout1",同时触发了微任务我们知道只有宏任务中的微任务执行完成了才会执行下一个宏任务所以会打印"promise1",最后执行"timeout2"

- 3、 async await 拆解
```js
// 如果 await 后是一个简单类型，则进行 Promsie 包裹
// 如果 await 后是一个 thenable 对象，则不用进行 Promsie 包裹（chrome 的优化）
async function fn() {
    // return await 1
    return Promise.resolve(1)
}
fn().then((data)=>{
    console.log(data)
})
async function fn1() {
  return await ({
    then(resolve) {
        resolve(1234);
    }
  });
}
fn1().then(res => console.log(res));
```

- 4.使用 async await 顺序判断（将 async await 转换成我们熟悉的 Promise）
```js
async function async1() {
  console.log("async1 start");
  // 可转换
  await async2();
  console.log("async1 end");
  //   new Promise(resolve => {
  //     console.log("async2")
  //     resolve()
  //   }).then(res => console.log("async1 end"))
}
async function async2() {
  console.log("async2");
}
async1();
console.log('script')
```
结果："async1 start" ，"async2", "script", "async1 end"

分析：首先执行async1里面的同步方法打印"async1 start"，执行await async1() 打印'script',此时有一个await所以console.log("async1 end")是一个异步操作，所以先打印script，后打印async1 end

- 5、如果 promise 没有 resolve 或 reject。
```js
  async function async1 () {
    console.log('async1 start');
    await new Promise(resolve => {
      console.log('promise1')
    })
    console.log('async1 success');
    return 'async1 end'
  }
  console.log('srcipt start')
  async1().then(res => console.log(res))
  console.log('srcipt end')
```
## 练习
- 实战1
```js
async function async1() {
  console.log("async1 start", 2);
  await async2();
  console.log("async1 end", 6);
}
async function async2() {
  console.log("async2", 3);
}
console.log("script start", 1);
setTimeout(function() {
  console.log("setTimeout", 10);
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1", 4);
  resolve();
})
  .then(function() {
    console.log("promise2", 7);
  })
  .then(function() {
    console.log("promise3", 8);
  })
  .then(function() {
    console.log("promise4", 9);
  });
console.log("script end", 5);
```
执行结果：在代码中已标识出来

分析：首先会执行console.log("script start", 1)这个没什么疑问，然后执行async1()打印 console.log("async1 start", 2)，接着执行async2(),此时会打印console.log("async2", 3),注意此时有一个await，相当于 new Promsie().then(()=> {console.log("async1 end", 6);}),此时.then会进入到异步队列中，接下来会执行new Promise()中的同步方法console.log("promise1", 4)，.then方法同样会进入到异步队列中然后在执行console.log("script end", 5)，此时所有的同步方法都执行完了，接着就会微任务中的回调方法了一次执行console.log("async1 end", 6);console.log("async1 end", 7);console.log("async1 end", 8);console.log("async1 end", 9);当所有的微任务执行完成后就会执行setTimeout最后打印console.log("async1 end", 10)

- 实战2
```js
async function async1() {
  console.log("async1 start", 1);
  return new Promise(resolve => {
    resolve(async2());
  }).then(() => {
    console.log("async1 end"， 4);
  });
}
 function async2() {
  console.log("async2", 2);
}
setTimeout(function() {
  console.log("setTimeout"， 8);
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1", 3);
  resolve();
})
  .then(function() {
    console.log("promise2", 5);
  })
  .then(function() {
    console.log("promise3",6);
  })
  .then(function() {
    console.log("promise4", 7);
  });
```
执行结果：在代码中已标识出来
分析：此题与实战一类是，主要是主要一下async1中resolve(async2()),这里还是会同步执行async2但是不会返回结果
<!-- 
## nodejs中的eventLoop
**nodejs中的宏任务**
- setTimeout
- setInterval
- setImmediate
- IO
**nodejs中的微任务**
- promsie(async)
- process.nextTick
// 比较 setImmediate 和 setTimeout 的执行顺序
```js
setTimeout(_ => console.log('setTimeout'))
setImmediate(_ => console.log('setImmediate'))
``` -->





