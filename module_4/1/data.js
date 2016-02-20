

function Complex(base){
    this.base = (typeof base === 'number') ? {x:base, y:0} : base;
    this.add = function(obj){
        var result;
        switch (typeof this.base) {
            case 'number':
                if (typeof obj === 'number'){
                    result = add2int();
                } else {
                    result = addIntComplex(this.base, obj);
                }
                break;
            case 'object':
                if (typeof obj === 'number'){
                    result = addIntComplex(obj, this.base);
                } else {
                    result = add2Complex();
                }
                break;
        }

        function add2int(){ return {x:base + obj, y:0}; };
        function addIntComplex(int, complex){return {x:int + complex.x, y:complex.y}};
        function add2Complex(){return {x:base.x + obj.x, y:base.y + obj.y}};
        return result;
    };
    this.sub = function(obj){
        var result;
        if (typeof obj === 'number'){
            obj = {x:obj, y:0};
        }
        result = {x:this.base.x-obj.x, y:this.base.y-obj.y};

        //(a,b)-(c,d)=(a-b,c-d);
        return result;
    };
    this.mul = function(){
        //(a,b)x(c,d)=(ac-bd,ad+bc);


    };
    this.div = function(){};
    this.equ = function(){};
    this.conj = function(){};
}
    var complex = new Complex(10);
    console.log(complex.sub(8));
