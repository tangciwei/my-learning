// new Fn()
var newobj = function(func) {

    var o = Object.create(func.prototype);
    let result = func.call(o);
    if (typeof result === 'object') {
        return result;
    } else {
        return o;
    }
}