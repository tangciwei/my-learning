function add1(str) {
    return str + 1;
}

function add2(str) {
    return str + 2;
}

function add3(str) {
    return str + 3;
}

// function compose(...arg){
//     arg.reverse();
//     let first = arg.shift();

//     return function(...initArg){
//         return arg.reduce((old,newItem)=>{
//             return newItem.call(null,old);
//         },first.apply(null,initArg));
//     }
// }

function compose(...arg) {
    let first = arg.pop();

    return function (...initArg) {
        return arg.reduce((old, newItem) => {

            return newItem.call(null, old);
        }, first.apply(null, initArg));
    };
}

let newaddfun = compose(add3, add2, add1);
let newstr = newaddfun('abc');
// "abc123"
