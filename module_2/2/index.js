var tree = {
    create: function (val) {
        var objTree = {value: val, left: null, right: null};
        return objTree;
    },
    add: function (useTree, val) {
        if (useTree.left === null && useTree.value > val) {
            useTree.left = tree.create(val);
        }
        else if (useTree.right === null && useTree.value < val) {
            useTree.right = tree.create(val);
        }
        else {
            if (val > useTree.value) {
                tree.add(useTree.right, val);
            }
            if (val < useTree.value) {
                tree.add(useTree.left, val);
            }
        }
    },
    search: function (useTree, val) {
        if (useTree === null) {
            return false;
        }
        if (useTree.value === val) {
            return true;
        }
        if (val > useTree.value) {
            return tree.search(useTree.right, val);
        }
        if (val < useTree.value) {
            return tree.search(useTree.left, val);
        }
        return false;
    },
    print: function print(useTree) {
        var stack = [], result;
        inDeep(useTree);
        function inDeep(tree) {
            if (tree.left === null) {
                if (tree.right === null) {
                    result = inDeep(tree.left.right);
                } else {

                }
                return tree.value;
            } else  {
                result = inDeep(tree.left);
            }
            return result;
        }
    }
};

var t = tree.create(8);
tree.add(t, 8);
tree.add(t, 10);
tree.add(t, 1);
tree.add(t, 6);
tree.add(t, 4);
tree.add(t, 7);
tree.add(t, 14);
tree.add(t, 13);
//console.log(tree.search(t, 3));
console.log(t);
console.log(tree.print(t));

//console.log(t);