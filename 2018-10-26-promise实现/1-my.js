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

myPromise.prototype.then = function (onFullfilled, onRejected) {
    let self = this;
    switch (self.status) {
        case 'pending':
            self.onFullfilledArray.push(function () {
                onFullfilled(self.value);
            });
            self.onRejectedArray.push(function () {
                onRejected(self.reason);
            });
            break;
        case 'resolved':
            onFullfilled(self.value);
            break;
        case 'rejected':
            onRejected(self.reason);
            break;
        default:
    }
};

var p = new myPromise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, 1000);
});

p.then(function (x) {
    console.log(x);
});
