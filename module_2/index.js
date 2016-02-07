var current = 0, selectedElement, selector;
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
    getSelectedElements();

    if (!selectedElement.length) {
        return;
    }

    hideActiveElement();
    switch (event.target.className) {
        case 'selector-next':
            current++;
            break;
        case 'selector-prev':
            current--;
            break;
        case 'nav-top':
            current--;
            break;
        case 'nav-bottom':
            current--;
            break;
        case 'nav-left':
            current--;
            break;
        case 'nav-right':
            current--;
            break;
        default:
            break;
    }
    showActiveElement();
}


function showActiveElement() {
    if (selectedElement.length === 1) {
        hideButton();
        selectedElement[0].classList.add('selected');
    } else if (selectedElement.length > 1) {
        showPrevNextButton();
        selectedElement[current].classList.add('selected');
    }
}

function hideButton() {
    buttonNext.disabled = true;
    buttonPrev.disabled = true;
    if (selectedElement[current].children.length){
        navBottom.disabled = true;
    }
    if (selectedElement[current].parentNode){
        navTop.disabled = true;
    }
    if (selectedElement[current].nextSibling){
        navLeft.disabled = true;
    }
    if (selectedElement[current].nextSibling){
        navRight.disabled = true;
    }
}

function showPrevNextButton() {
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
