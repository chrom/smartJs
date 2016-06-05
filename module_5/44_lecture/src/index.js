// https://gist.github.com/xanf/ea1b0e828229505d8a79
import {Router, history} from 'backbone';
import {openRegistrationPopup} from '../src/helper/popup';
import {openLoginPopup} from '../src/helper/popup';
import {appState} from './views/app/appState';
import {UserBoard} from './views/index';
import UserCollection from './collections/UsersCollection';
import {LoginForm} from './views/index';

function initLoadedBlock(){
    appState.registrBtn = document.querySelector('#register-btn');
    appState.loginBtn = document.querySelector('#login-popup-btn');
    showForm();
}

function showForm() {
    appState.registrBtn.addEventListener('click', function () {
        openRegistrationPopup()
            .then(data => {
                history.navigate('#success-registration', { trigger: true });
            });
    });
    appState.loginBtn.addEventListener('click', function () {
        history.navigate('#success-registration', { trigger: true });
    });
}

function loginInit(){
    openLoginPopup()
        .then(data => {
            let userList = new UserCollection(data);
            let UsersListBoard = new UserBoard({collection: userList});
        });
    appState.registrBtn = document.querySelector('#register-btn');
    appState.loginBtn = document.querySelector('#login-popup-btn');
    appState.registrBtn.disabled = true;
    appState.loginBtn.disabled = true;
}

const AppRouter = Router.extend({
    routes: {
        //'*': 'initLoadedBlock',
        '': 'initLoadedBlock',
        'success-registration': 'loginInit'
    },
    showForm,
    loginInit,
    initLoadedBlock,
});

const app = new AppRouter();
window.addEventListener('load', () => history.start());

// промисы должны работать ВНУТРИ БЛОКА. почему весь код срабатывает
// дописать проверку если юзер уже зарегестрирован - непонятно почему иногда не проходит
// дописать проверку на одинаковые пароли
// когда подключаем - если без скобок - ищет только то что дефолтный експорт
// разобраться с роутером. нужна чтоб 1 функция загружалась на любой роут