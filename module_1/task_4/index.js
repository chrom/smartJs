
function search(obj, value) {
    var path = [], result;
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        for (var key in obj) {
            if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                path.push(key + '.');
                result = search(obj[key], value);
                if (result === false) {
                    path.pop();
                } else {
                    path.push(result);
                    return path.join('');
                }
            } else if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value) {
                path.push(key);
                return path.join('');
            }
        }
    }
    if (Array.isArray(obj)) {
        for (var i = 0; obj.length > i; i++) {
            if (typeof obj[i] === 'object') {
                path.push('[' + i + ']');
                result = search(obj[i], value);
                if (result === false) {
                    path.pop();
                } else {
                    path.push(result);
                    return path.join('');
                }
            } else if (obj[i] === value) {
                path.push('[' + i + ']');
                return path.join('');
            }
        }
    }
    if (typeof path.length <= 0) {
        return false;
    }
    return path;
}


document.writeln('<br/>Function search: ' + search({
        a: 3,
        b: {u: [3, 5, 'a', {c: 'r', w: ['z', 52]}], '5': 'c', s: 5},
        c: 8
    }, 52));
