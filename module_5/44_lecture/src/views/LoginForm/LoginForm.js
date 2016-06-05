import { View } from 'backbone';
import template from 'lodash/template';
import viewTemplate from './LoginForm.html';
import styles from './LoginForm.css';
import styleHelper from '../../helper/style';
import rootStyles from '../../../dist/styles.css';
import {validationHelper} from '../../helper/error';
import {appState} from '../app/appState';

const LoginView = View.extend({
    template  : template(viewTemplate),

    initialize: function () {
        this.promise = new Promise((resolve, reject) => {
            this.resolveF = resolve;
            this.rejectF = reject;
        });
    },

    events: {
        'click #submit_login': 'userRequestF',
        'focus #login-form input': 'removeErrorValidation',
        'click #login-form .close': 'removeView'
    },

    hide: function(){
        this.$el.remove();
    },

    removeView: function(){
        this.$el.remove();
        appState.registrBtn.disabled = false;
        appState.loginBtn.disabled = false;
    },

    removeErrorValidation: function () {
        let currId = event.target.id;
        this.$el.find('span[data-error-for='+currId+']')[0].classList.remove(rootStyles['visible-error']);
    },

    userRequestF: function(e){
        e.preventDefault();
        const emailField = document.querySelector('#signInEmail');
        const password = document.querySelector('#signInPassword');
        let formArray = [{signInEmail: emailField.value}];
        let headerRequest = new Headers();
        headerRequest.append("Content-Type", "application/json");
        const url = 'http://tasks.smartjs.academy/login';
        const urlUsersList = 'http://tasks.smartjs.academy/users';
        let tempThis = this;
        validationHelper(formArray, this.$el);

        if (this.$el.find('span.'+rootStyles['visible-error']).size() === 0) {
            let emailData = JSON.stringify({
                email:      emailField.value,
                password:   password.value
            });
            let loginRequest = {
                method:         'POST',
                headers:        headerRequest,
                body:           emailData
            };
            fetch(url, loginRequest).then(data => data.json()).then(
                function(response){
                    const token = response.token;
                    let headerUserListRequest = new Headers();
                    headerUserListRequest.append("Authorization", "Bearer "+token);
                    appState.token = token;
                    let userListRequest = {
                        method:         'GET',
                        headers:        headerUserListRequest
                    };
                    fetch(urlUsersList, userListRequest).then(data => data.json()).then(
                        function(response){
                            tempThis.resolveF(response);
                            tempThis.remove();
                        },
                        function(reject){
                            throw new Error('Some error with your data. More detailier:' + reject);
                        })
                },
                function(reject){
                    throw new Error('Some error with your data. More detailier:' + reject);
                }
            );
        }
    },

    render: function () {
        const html = template(viewTemplate)({});
        this.$el.append(html);
        styleHelper(this.el, styles);
        return this.$el;
    },
});

export default LoginView;