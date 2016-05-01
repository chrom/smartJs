// Написать функцию binSearch(arr, value) которая получает на вход отсортированный массив arr и
// значение value (примитивное) для поиска. Возвращаемое значение функции ­ индекс в массиве где находится
// элемент или ­1 если элемента в массиве нет.
//
// Алгоритм: берем число из середины массива, сравниваем с value. Если оно оказалось больше, значит ищем в первой
// половине массива, если меньше — во второй. Продолжаем делить оставшуюся половину,
//     когда находим нужное число возвращаем его индекс, если не находим возвращаем ­1.


function binSearch(arr, value) {
    if (!Array.isArray(arr) && !Number.isInteger(value)) {
        throw 'Not correct parameters type!';
    }

    var result = searchIndexValue(arr.length, arr);

    function searchIndexValue(index, array) {
        let averageValue = Math.round(index / 2);
        if (array[averageValue] === value) {
            return averageValue;
        } else if (array[averageValue] >= array.length || averageValue < 0) {
            return -1;
        } else if (array[averageValue] > value) {
            return searchIndexValue(averageValue + averageValue / 2 - 1 , array)
        } else {
            return searchIndexValue(averageValue + array.length, array)

        }
    }

    return result;
}


console.log(
    binSearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 7)
);