function myPromise(constructor) {
    let self = this;
    self.status = 'pending'; // 定义状态改变前的初始状态

    self.value = undefined; // 定义状态为resolved的时候的状态
    self.reason = undefined; // 定义状态为rejected的时候的状态

    self.onFullfilledArray = [];
    self.onRejectedArray = [];

    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'resolved';
            self.onFullfilledArray.forEach(function (f) {
                f(self.value);
                // 如果状态从pending变为resolved，
                // 那么就遍历执行里面的异步方法
            });
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedArray.forEach(function (f) {
                f(self.reason);
                // 如果状态从pending变为rejected， 
                // 那么就遍历执行里面的异步方法
            });
        }
    }
    // 捕获构造异常
    try {
        constructor(resolve, reject);
    }
    catch (e) {
        reject(e);
    }
}
// 改造为链式调用改造+错误处理
myPromise.prototype.then = function (onFullfilled, onRejected) {
    let self = this;
    let promise2;
    switch (self.status) {
        case 'pending':
            promise2 = new myPromise(function (resolve, reject) {
                self.onFullfilledArray.push(function () {
                    try {
                        let temple = onFullfilled(self.value);
                        resolve(temple);
                    }
                    catch (e) {
                        reject(e); // error catch
                    }
                });
                self.onRejectedArray.push(function () {
                    try {
                        let temple = onRejected(self.reason);
                        reject(temple);
                    }
                    catch (e) {
                        reject(e); // error catch
                    }
                });
            });
            break;
        case 'resolved':
            promise2 = new myPromise(function (resolve, reject) {
                try {
                    let temple = onFullfilled(self.value);
                    // 将上次一then里面的方法传递进下一个Promise的状态
                    resolve(temple);
                }
                catch (e) {
                    reject(e); // error catch
                }
            });
            break;
        case 'rejected':
            promise2 = new myPromise(function (resolve, reject) {
                try {
                    let temple = onRejected(self.reason);
                    // 将then里面的方法传递到下一个Promise的状态里
                    resolve(temple);
                }
                catch (e) {
                    reject(e);
                }
            });
            break;
        default:
    }
    return promise2;
};

var p = new myPromise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, 1000);
});
p.then(function (x) {
    console.log(x);
}).then(function () {
    console.log('链式调用1');
}).then(function () {
    console.log('链式调用2');
});
