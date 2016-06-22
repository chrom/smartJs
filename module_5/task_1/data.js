// https://gist.github.com/xanf/192635af3008d8e800b0#51-popup


class PopupContainer{
    constructor(){
        this.last;
    };
    add(obj){
        if (this.last !== undefined && this.last.overlay !== null){
            this.last.hide();
        }
        this.last = obj;
    }
}


class Popup{

    constructor(form){
        if (form === null){
            return false;
        }
        this.form = form;
        this.popup = form;
        this.conteiner = new PopupContainer();
    };
    show(){
        this.conteiner.add(this);
        this._createOverlay();
    };
    hide(){
        this.overlay.parentNode.removeChild(this.overlay);
        this.overlay = null;
    };

    _createOverlay(){
        this.overlay = document.createElement("div");
        this.overlay.className += 'popup';
        this.overlay.appendChild(this.form);
        this.form.style.display = 'block';
        document.body.appendChild(this.overlay);
        this.overlay.addEventListener('click', function (event) {
            event.target.parentNode.removeChild(event.target);;
            console.log(event);
        });
    }
}

window.addEventListener('load', function () {


const popup1 = new Popup(document.querySelector('#form_1'));

    popup1.show();
    // popup1.hide();
// const popup2 = new Popup(document.querySelector('#form_2'));
// popup2.show();
    // popup2.hide();
})