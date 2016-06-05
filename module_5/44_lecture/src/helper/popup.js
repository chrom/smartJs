import {registrationForm} from '../views/index';
import {LoginForm} from '../views/index';

export function openRegistrationPopup() {
    var regPopup = new registrationForm();
    regPopup.render();
    $(document.body).append(regPopup.$el);
    return regPopup.promise;
}

export function openLoginPopup() {
    var loginPopup = new LoginForm();
    loginPopup.render();
    $(document.body).append(loginPopup.$el);
    return loginPopup.promise;
}

export function openConfirmPopup(){
    var confirmPopup = new confirmPopup();
}