// Реализуйте уже известное Вам задание на поиск примитивного значения внутри объекта Н Е используя рекурсию.
// Достаточно возвращать true / false, тем не менее, если задание окажется для Вас простым ­ реализуйте еще и вывод пути
// Формат входных данных: вы уже все знаете :)


function search(needle, haystack) {
    if (typeof haystack !== 'object' && !Number.isInteger(needle)) {
        throw 'Not correct parameters type!';
    }
    var queue = [{
        object: haystack,
        path: ''
    }];

    var currentQueueItem;

    while (currentQueueItem = queue.shift()) {
        let currentPath = currentQueueItem.path;
        let currentObject = currentQueueItem.object;
        for (let item in currentObject) {
            if (needle === currentObject[item]) {
                return currentPath.slice(1) + '.' + item;
            }

            if (typeof currentObject[item] === "object") {
                let newPath;
                if (Array.isArray(currentObject)) {
                    newPath = currentPath + '[' + item + ']';
                } else {
                    newPath = currentPath + '.' + item;
                }
                queue.push({
                    object: currentObject[item],
                    path: newPath,
                });
            }
        }
    }

    return false;
}

console.log(search(4, {a: [1, 2, {s: 4, c: {u: 5}}], s: 9}));