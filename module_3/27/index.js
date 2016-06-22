const BOWLING = 'http://bowling.smartjs.academy/';
var table, connection, roadNumber, roads, button;
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
    getCastQuery(roadNumber);
}
// TODO: как добавлять элемены скопом а не по отдельности (список дорожек)
// TODO: чем на бэк-енде отличается реализация short-polling from long-polling
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
            selector.appendChild(e);
        }
        button.disabled = false;
    }

}

function setCastForRoad() {
    if (connection.readyState === connection.DONE) {
        console.log(JSON.parse(connection.responseText));
    }
}