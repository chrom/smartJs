// https://gist.github.com/xanf/ea1b0e828229505d8a79
import {Router, history} from 'backbone';
import {UserBoard} from './views/index';
import UserCollection from './collections/UsersCollection';
import PaginationView from './views/PaginationView/PaginationView';
import {LoginForm} from './views/index';
import {NavView} from './views/index';
import {api} from './api/api';

function initLoadedBlock(){
    let NavigationView = new NavView();
    NavigationView.render();
    api.initialize('navView', NavigationView);
}

function registrationInit(){
    if (api['navView'] !== undefined) {api['navView'].logoutSuccess();}
    document.querySelector('.content').innerHTML = '';
    api.register()
        .then(data => {
            history.navigate('#success-registration', { trigger: true });
        });
}

function loginInit(){
    let userList;
    api.removeRegister();
    if (localStorage.getItem('token') !== null) {
        _loginPromiseFunc(false).then(data => {
            api['navView'].registerSuccess();
        });
    }
    else {
        api.login().then(data => {
            _loginPromiseFunc(true);
        }).then(data => {
            api['navView'].registerSuccess();
        });
    }

    function _loginPromiseFunc(tokenFlag){
        return new Promise(function(resolve, reject) {
            userList = new UserCollection();
            userList.fetch('http://tasks.smartjs.academy/users', userList, tokenFlag).then(
                function(data){
                    if (data.error === undefined) {
                        let UsersListBoard = new UserBoard({collection: userList});
                        let PaginationBoard = new PaginationView({collection: userList});
                        resolve(data);
                    }
                }
            );
        });
    }
}

const AppRouter = Router.extend({
    routes: {
        '': 'initLoadedBlock',
        'success-registration': 'loginInit',
        'open-registration': 'registrationInit'
    },
    loginInit,
    registrationInit
});

const app = new AppRouter();

window.addEventListener('load', () => {
    history.start();
    initLoadedBlock();
});


// дописать проверку если юзер уже зарегестрирован - непонятно почему иногда не проходит
// дописать проверку на одинаковые пароли

// когда подключаем - если без скобок - ищет только то что дефолтный експорт
// почему по клику не создается еще eventlistener?  history.navigate не переходит на ссылку если мы уже на ней (10 раз кликнуть на регистрацию - только 1 вызов)

// обработчик ошибок написать правильный. catch или 1 функцию reject. чтоб она одна была. не срабатывает на запрос если не 200 статус запроса