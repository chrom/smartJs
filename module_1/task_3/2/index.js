var R = {
    '_': 'KOTIK',
    bind: function (f, val) {
        var result = [], tmp = [];
        for (var i = 1; i < arguments.length; i++) {
            result.push(arguments[i]);
            if (arguments[i] === R._) {
                tmp.push(i);
            }
        }
        return function () {
            if (arguments.length < 1) {
                for (var i1 = 0; i1 < tmp.length; i1++) {
                    result[tmp[i1] - 1] = "underfined";
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    result[tmp[i] - 1] = arguments[i];
                }
            }
            return f.apply(val, result);
        }
    }
};

function g(a, b, c) {
    console.log(this, a, b, c);
}

var p1 = R.bind(g, 1, R._, R._);
console.log(p1());
console.log(p1(2));
console.log(p1(2, 3));