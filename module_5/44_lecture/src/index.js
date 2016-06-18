// https://gist.github.com/xanf/ea1b0e828229505d8a79
import {Router, history} from 'backbone';
import {UserBoard} from './views/index';
import UserCollection from './collections/UsersCollection';
import PaginationView from './views/PaginationView/PaginationView';
import {LoginForm} from './views/index';
import {api} from './api/api';

function initLoadedBlock(){
    api.registrBtn = document.querySelector('#register-btn');
    api.loginBtn = document.querySelector('#login-popup-btn');
    api.logoutBtn = document.querySelector('#logout-popup-btn');

    api.registrBtn.addEventListener('click', function () {
        history.navigate('#open-registration', { trigger: true });
    });

    api.loginBtn.addEventListener('click', function () {
        history.navigate('#success-registration', { trigger: true });
    });

    api.logoutBtn.addEventListener('click', function () {
        let headerRequest = new Headers();
        headerRequest.append("Authorization", "Bearer "+api.gettoken());
        const url = 'http://tasks.smartjs.academy/logout';
        let loginRequest = {
            method:         'GET',
            headers:        headerRequest
        };
        fetch(url, loginRequest).then(data => data.json()).then(
            function(response){
                console.log(response);
            },
            function(reject){
                console.log(reject);
            }
        );
    });

    var btnArray = document.querySelectorAll('.buttons-form > button');
    Array.from(btnArray).forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.content').innerHTML = '';
        });
    });

    //history.navigate('#open-registration', { trigger: true });
}

function registrationInit(){
    api.register()
        .then(data => {
            api.registrBtn.style.display = 'none';
                history.navigate('#success-registration', { trigger: true });
            });
}

function loginInit(){
    let userList;
    if (localStorage.getItem('token') !== null) {
        loginPromiseFunc(false).then(data => {
            api.loginBtn.style.display = 'none';
            api.logoutBtn.style.display = 'inline-block';
        });
    }
    else {
        api.login().then(data => {
            return loginPromiseFunc(true);
        }).then(data => {
            api.loginBtn.style.display = 'none';
            api.logoutBtn.style.display = 'inline-block';
        });
    }

    function loginPromiseFunc(tokenFlag){
        return new Promise(function(resolve, reject) {
            userList = new UserCollection();
            userList.fetch(userList, tokenFlag).then(
                function(data){
                    if (data.error === undefined) {
                        userList.setData(data);
                        let UsersListBoard = new UserBoard({collection: userList});
                        let PaginationBoard = new PaginationView({});
                        PaginationBoard.setCollection(userList);
                        resolve(data);
                    }
                    else {
                        throw new Error('Some problem with request. More info: '+ data.error);
                    }
                },
                function(error){
                    throw new Error('Some problem with request. More info: '+ error);
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
    initLoadedBlock,
    registrationInit
});

const app = new AppRouter();
window.addEventListener('load', () => {
    history.start();
    api.initialize();
    initLoadedBlock();
});

// промисы должны работать ВНУТРИ БЛОКА. почему весь код срабатывает
// дописать проверку если юзер уже зарегестрирован - непонятно почему иногда не проходит
// дописать проверку на одинаковые пароли
// когда подключаем - если без скобок - ищет только то что дефолтный експорт
// разобраться с роутером. нужна чтоб 1 функция загружалась на любой роут
// почему по клику не создается еще eventlistener?  history.navigate не переходит на ссылку если мы уже на ней (10 раз кликнуть на регистрацию - только 1 вызов)

// метод fetch переделать. он должен сам сразу загружать в коллекцию данные а не в index.js