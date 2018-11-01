function add1(str) {
    return str + 1
}

function add2(str) {
    return str + 2
}

function add3(str) {
    return str + 3
}


function compose(...fns){
    return function(...arg){
        return fns.reduce((old,fn)=>{
            return (...arg2)=>{
                old(fn)
            }
            // return fn.apply(null,[].concat(old));
        });
    }
}

let newaddfun = compose(add3, add2, add1);
let newstr = newaddfun("abc") //"abc123"
console.log(newstr)