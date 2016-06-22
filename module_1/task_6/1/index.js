// Написать функцию myBind2(fn, newThis, n1, n2, …, nn) работа которой должна быть
// полностью аналогична работе fn.bind(newThis, n1, n2, …, nn). Количество
// “дополнительных аргументов” n1, n2… nn может быть любым.

function myBind2(fn, newThis) {
    var myBind2Arguments = [].slice.call(arguments);
    return function (){
        var allArguments = [].slice.apply(arguments).concat(myBind2Arguments.slice(2));
        return fn.apply(newThis, allArguments);
    };
}

// ? - Почему получается использовать [] и не получается использовать Array для call?
//  В чем разница между Array & []?
//
// [].slice.call(arguments);
// [f(p1, p2, n1), null, 1, 2, 5]
// Array.slice.call(arguments)
// VM1745:1 Uncaught TypeError: Cannot read property 'call' of undefined(…)(anonymous function)


// ? - где используется возможность пердустанавливать параметры

function myfunc(p1, p2, n1) {
    console.log(arguments);
};

var newFuncMybund = myBind2(myfunc, null, 1, 2, 5);
newFuncMybund(3);
var newFunc = myfunc.bind(null, 1, 2);
newFunc(3);
