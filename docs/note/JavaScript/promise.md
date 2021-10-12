# Promise

Promsie必须为以下三种状态：
1. <font>PEDDING</font> 准备态
2. <font>FULFILED</font> 执行态
3. <font>REJECTED</font> 拒绝态
一旦Promsie被执行则无法取消。

基本过程：
1. Promise的初始化状态为PEDDING
2. 立即执行函数Promise中传入fn函数，将Promise内部的resolve，reject函数传入fn中，按事件机制处理
3. 执行then()方法注册回调处理函数
4. Promise里的关键是要保证，then方法传入的参数 onFulfilled 和 onRejected，必须在then方法被调用的那一轮事件循环之后的新执行栈中执行。

## 链式调用
```js
new Promise((resolve,reject)=> {
    setTimeout(()=> {
        resolve('data1')
        resolve('data2)
    },2000)
}).then((data)=> {
    console.log(data)
})
```
<!-- 这个大家结果大家都清楚输出'data1'，这是为什么呢？
主要原因是因为Promise的状态改变了，当初次执行Promise时状态是PEDDING，调用了resolve内部方法此时状态变为了FULFILED，同时reoslve内部的值也会传递到下一个then方法的data中 -->

## all

```js
Promise.prototype.all = function(promises) {
    // 
    return new Promsie((resolve, reject)=> {
        let result = []
        let len = 
        promises.forEach((promsie,index)=> {
            if(promsie instanceof Promise) {
                promsie.then((v)=> {
                    result.push(v)
                    if(index===promises.length) resolve(result)
                }).catch(err=> {
                    reject(err)
                })
            } else {
                 reject('not Promise')
            }
            
        })
    }) 
}
```

## catch

```js
Promise.prototype.catch = function(cb) {
    return this.then(null,cb)
}
```

## race
```js
Promise.prototype.race = function(promises) {
    return new Promise((resolve, reject)=> {
        for(let i=0;i<promises.length;i++) {
            promises[i].then(resolve, reject)
        }   
    })
}
```
## finally
```js
Promise.prototype.finally = function(cb) {
    return this.then((data)=> {
        return Promise.resolve(cb()).then(()=>data)
    },err=> {
        return Promise.resolve(cb()).then(() => {throw err});
    })
}
```

