//https://gist.github.com/xanf/fad6577ba8a3f00fbd13#21-Работа-со-списками

var list = {

    create: function () {
        return {'value': 'HEAD', 'next': null};
    },
    add: function (list, value) {
        if (list.next === null) {
            list.next = {'value': value, 'next': null};
        } else {
            this.add(list.next, value);
        }
    },
    remove: function (list, index) {
        if (index >= 1 && list.next !== null) {
            this.remove(list.next, --index);
        } else if (index === 0) {
            if (list.next !== null) {
                list.next = list.next.next;
            } else {
                list.next = null;
            }
        }
    },
    search: function (list, value) {
        if (list.value === value) {
            return list;
        } else if (list.next !== null) {
            this.search(list.next, value);
        } else {
            return null;
        }
    },
    isEmpty: function (list) {
        if (list.value === 'HEAD' && list.next === null) {
            return true;
        } else {
            return false;
        }
    },
    insertAt: function (list, value, index) {
        if (index !== 0 && list.value === 'HEAD') {
            this.insertAt(list.next, value, index);
        } else if (index === 0 && list.value === 'HEAD') {
            list.next = {'value': value, 'next': null};
        } else if (index > 1 && list.next !== null) {
            this.insertAt(list.next, value, --index);
        } else if (index === 1) {
            var node = {'value': value, 'next': null};
            if (list.next !== null) {
                node.next = list.next;
            }
            list.next = node;
        }
    },
    toArray: function (list) {
        var result = '';
        if (list.next !== null) {
            let val = (list.value === "HEAD") ? "" : ',' + list.value;
            result = val + this.toArray(list.next);
        } else {
            result = ',' + list.value;
        }

        if (list.value === "HEAD") {
            return result.slice(1).split(',');
        }
        return result;
    },
    size(list){
        return this.toArray(list).length;
    },
    get(list, index){
        let result = '';
        if (list.value === 'HEAD'){
            result = this.get(list.next, index);
        } else if (index >= 1 && list.next !== null) {
            result = this.get(list.next, --index);
        } else if (index === 0) {
            result = list.value;
        }
        return result;
    }
}


var x = list.create();
list.add(x, 1);
list.add(x, 3);
list.add(x, 5);
//list.remove(x, 4);
list.insertAt(x, 7, 3);
console.log(list.size(x));
console.log(list.toArray(x));
console.log(list.remove(x, 0));
console.log(list.toArray(x));
console.log(list.get(x, 1));
//console.log(list.toArray(x)); // [1, 3, 5]
//console.log(list.size()); // 3
//list.remove(x, 1);
//console.log(list.toArray(x); // [1, 5]
//list.add(x, 8);
//list.add(x, 10);
//console.log(list.toArray(x); // [1, 5, 8, 10]
//list.insertAt(l, 2, 11);
//console.log(list.toArray(x); // [1, 5, 11, 8, 10]
//console.log(list.search(l, 11));