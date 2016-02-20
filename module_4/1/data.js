function Complex(base) {
    this.add = function (obj) {
        return {x: base.x + obj.x, y: base.y + obj.y};
        //(a,b)+(c,d)=(a+b,c+d);
    };
    this.sub = function (obj) {
        obj = this.clearObj(obj);
        return {x: this.base.x - obj.x, y: this.base.y - obj.y};
        //(a,b)-(c,d)=(a-b,c-d);
    };
    this.mul = function (obj) {
        obj = this.clearObj(obj);
        return {x: this.base.x * obj.x - this.base.y * obj.y, y: this.base.x * obj.y + this.base.y * obj.x};
        //(a,b)x(c,d)=(ac-bd,ad+bc);
    };
    this.div = function (obj) {
        obj = this.clearObj(obj);
        var result = {
            x: (this.base.x * obj.x + this.base.y * obj.y) / (obj.x * obj.x),
            y: (this.base.x * obj.y + this.base.y * obj.x) / (obj.y * obj.y)
        };
        return result;
        //(a,b)/(c,d)=(ac+bd,bc-ad)/(c^2+d^2);
    };
    this.equ = function (obj) {
        obj = this.clearObj(obj);
        return this.base.x === obj.x && this.base.y === obj.y;
        //(a,b)=(c,d),если (a=c) и (b=d);
    };
    this.conj = function (obj) {
        obj = this.clearObj(obj);
        return {x: obj.x, y: Math.abs(obj.y)};
        //conj (a,b)=(a,-b).
    };
    this.clearObj = function (obj) {
        var stack = [obj, this.base];
        for (var item in stack) {
            for (var index in stack[item]) {
                if (stack[item].hasOwnProperty(index) && isNaN(stack[item][index])) {
                    throw new Error('Some value is NaN');
                }
            }
        }
        return (typeof obj === 'number') ? {x: obj, y: 0} : obj;
    };
    this.base = this.clearObj(base);
}
var complex = new Complex({x: 2, y: 2});
console.log(complex.conj({x: 2, y: -2}));
