const BOWLING = 'http://bowling.smartjs.academy/';
var table, connection, roadNumber, roads, button, result = [];
window.addEventListener("load", ready);
function ready() {
    table = document.querySelector('table');
    hideTable();
    addEventListenersToButton();
    getRoadsList();
}

function getRoadsList() {
    if (roads === undefined) {
        getQuery(BOWLING + 'list');
        connection.addEventListener('readystatechange', setRoadList);
    }
}

function getQuery(query) {
    connection = new XMLHttpRequest();
    connection.open('GET', query);
    connection.send();
}

function hideTable() {
    table.style.display = 'none';
}

function showTable() {
    table.parentNode.removeChild(table);
    document.body.appendChild(table);
    table.style.display = 'block';
    getCastForRoad();
}

function addEventListenersToButton() {
    button = document.querySelector('button');
    button.addEventListener('click', showTable);
    button.disabled = true;
}

function getCastForRoad() {
    var selectedRoad = document.querySelector('select');
    roadNumber = selectedRoad.selectedOptions[0].value;
    getCastQuery(roadNumber);
}

function getCastQuery() {
    getQuery(BOWLING + 'lane?num=' + roadNumber);
    connection.addEventListener('readystatechange', setCastForRoad);
    //window.setTimeout(getCastQuery, 3000);
}
// TODO: как добавлять элемены скопом а не по отдельности (список дорожек)
// TODO: чем на бэк-енде отличается реализация short-polling from long-polling
// element.clonNode(true)
function setRoadList() {
    if (connection.readyState === connection.DONE) {
        roads = JSON.parse(connection.responseText);
        if (roads.length === undefined) {
            throw new Error("Не удалось получить список доступных дорожек, возможно проблемы на сервере или он будет доступен позже!");
        }
        var selector = document.querySelector('select.lanes');
        for (var i = 0; roads.length > i; i++) {
            var e = document.createElement('option');
            e.value = roads[i];
            e.textContent = i;
            getCastQuery
            selector.appendChild(e);
        }
        button.disabled = false;
    }

}

function setCastForRoad() {
    if (connection.readyState === connection.DONE) {
        var responce = [10, 8, 2, 4];
        var round = 0, obj, trow = 2;
        for (var i = 0; responce.length > i; i++) {
            if (((i + 1) % 2) === 1) {
                round++;
                obj = {'round': round, 'trow': [], 'sum': 0};
                if (trow === 1) {
                    result[result.length - 1].sum += responce[i];
                }
                trow = 2;
            }
            obj.trow[i] = (responce[i] === 10) ? 'X' : responce[i];
            obj.sum += responce[i];
            if (obj.sum === 10) {
                trow++;
            } else {
                trow--;
            }
            if (((i + 1) % 2) === 0) {
                result.push(obj);
            }
        }
        console.log(result);
        console.log(JSON.parse(connection.responseText));
    }
}