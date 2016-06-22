var R = {
    '_': 'kotik',
    bind: function (f, val) {
        var RArguments = [];
        var tempIdParams = [];
        for (let i = 1; i < arguments.length; i++) {
            if (arguments[i] === R._) {
                tempIdParams.push(i);
            }
            RArguments.push(arguments[i]);
        }
        return function () {
            if (arguments.length < 1) {
                for (let j = 0; j < tempIdParams.length; j++) {
                    RArguments[tempIdParams[j] - 1] = undefined;
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    RArguments[tempIdParams[i] - 1] = arguments[i];
                }
            }
            return f.apply(val, RArguments);
        }
    }
};

function g(a, b, c, d) {
    return this + ' ' + a + ' ' + b + ' ' + c + ' ' + d;
}

var p1 = R.bind(g, 1, 1, R._, R._);
console.log(p1());
console.log(p1(4));
console.log(p1(4, 5));