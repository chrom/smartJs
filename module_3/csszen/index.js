var current = 0, selectedElement, selector, isTreeNavigation = false;
var buttonNext;
var buttonPrev;
var buttonSelector;
var navTop;
var navBottom;
var navLeft;
var navRight;
var panel;

window.onload = function () {
    buttonNext = document.querySelector('.selector-next');
    buttonPrev = document.querySelector('.selector-prev');
    buttonSelector = document.querySelector('.selector-find');
    navTop = document.querySelector('.nav-top');
    navBottom = document.querySelector('.nav-bottom');
    navLeft = document.querySelector('.nav-left');
    navRight = document.querySelector('.nav-right');
    panel = document.querySelector('.jsbursa-panel');

    buttonNext.addEventListener('click', selectNode);
    buttonPrev.addEventListener('click', selectNode);
    buttonSelector.addEventListener('click', selectNode);
    navTop.addEventListener('click', selectNode);
    navBottom.addEventListener('click', selectNode);
    navLeft.addEventListener('click', selectNode);
    navRight.addEventListener('click', selectNode);
}

function selectNode(event) {
    var element;

    hideActiveElement();
    switch (event.target.className) {
        case 'selector-next':
            current++;
            break;
        case 'selector-prev':
            current--;
            break;
        case 'nav-top':
            element = selectedElement[current].parentElement;
            break;
        case 'nav-bottom':
            element = selectedElement[current].firstElementChild;
            break;
        case 'nav-left':
            element = selectedElement[current].previousElementSibling;
            break;
        case 'nav-right':
            element = selectedElement[current].nextElementSibling;
            break;
        default:
            getSelectedElements();
            isTreeNavigation = false;
            break;
    }

    if (selectedElement && !selectedElement.length) {
        return;
    }

    if(element){
        isTreeNavigation = true;
        selectedElement = [];
        selectedElement.push(element);
        current = 0;
    }

    showActiveElement();
}


function showActiveElement() {
    treeNavigation();
    if (selectedElement.length === 1) {
        hideButton();
        selectedElement[0].classList.add('selected');
    } else if (selectedElement.length > 1) {
        selectorNavigation();
        selectedElement[current].classList.add('selected');
    }
}

function treeNavigation() {
    if (selectedElement[current].childElementCount > 0) {
        navBottom.disabled = false;
    } else {
        navBottom.disabled = true;
    }
    if (selectedElement[current].parentNode) {
        navTop.disabled = false;
    } else {
        navTop.disabled = true;
    }
    if (selectedElement[current].nextElementSibling) {
        navRight.disabled = false;
    } else {
        navRight.disabled = true;
    }
    if (selectedElement[current].previousElementSibling) {
        navLeft.disabled = false;
    } else {
        navLeft.disabled = true;
    }
}
function hideButton() {
    buttonNext.disabled = true;
    buttonPrev.disabled = true;
}

function selectorNavigation() {
    if (isTreeNavigation){
        buttonNext.disabled = true;
        buttonPrev.disabled = true;
        return;
    }
    if (selectedElement.length - 1 > current) {
        buttonNext.disabled = false;
    } else {
        buttonNext.disabled = true;
    }
    if (0 !== current) {
        buttonPrev.disabled = false;
    } else {
        buttonPrev.disabled = true;
    }
}

function hideActiveElement() {
    var selectedElement = document.querySelector('.selected');
    if (selectedElement)
        selectedElement.classList.toggle('selected');
}

function errorShow() {
    error('Похоже, ничего не найдено по этому селектору, попробуйте другой!');
}

function errorEmptySelector() {
    error('Поле не может быть пустым, нужно ввести валидный селектор!');
}

function error(text) {
    var div = document.createElement('div');
    div.className = 'error';
    div.innerText = text;
    panel.appendChild(div);
}


function errorHide() {
    var error = document.querySelector('.error');
    if (error) error.parentNode.removeChild(error);

}

function getSelectedElements() {
    errorHide();
    selector = document.querySelector('input.selector');
    if (selector.value) {
        selectedElement = document.querySelectorAll(selector.value);
        if (!selectedElement.length && !document.querySelector('.error')) {
            errorShow();
        }
    } else if (!document.querySelector('.error')) {
        errorEmptySelector();
    }
}
