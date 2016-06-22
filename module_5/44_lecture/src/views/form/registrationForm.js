import { View } from 'backbone';
import template from 'lodash/template';
import viewTemplate from './registrationForm.html';
import styles from './registrationForm.css';
import rootStyles from '../../../dist/styles.css';
import styleHelper from '../../helper/style';
import {validationHelper} from '../../helper/error';
import popupManager from '../../helper/popup';
import {appState} from '../app/appState';

const RegistrationView = View.extend({
    template  : template(viewTemplate),

    initialize: function () {
        this.promise = new Promise((resolve, reject) => {
            this.resolveF = resolve;
            this.rejectF = reject;
        });
    },

    events: {
        'click #submit_registration': 'validationF',
        'focus #registration-modal input': 'removeErrorValidation',
        'click #registration-modal .close': 'removeView'
    },

    removeView: function(){
        this.$el.remove();
        appState.registrBtn.disabled = false;
        appState.loginBtn.disabled = false;
    },

    removeErrorValidation: function () {
        let currId = event.target.id;
        if (currId === 'email') {
            this.$el.find('span[data-error-for=async-'+currId+']')[0].classList.remove(rootStyles['visible-error']);
        }
        this.$el.find('span[data-error-for='+currId+']')[0].classList.remove(rootStyles['visible-error']);
    },

    validationF: function (e) {

        const checkValidate = (e) => {
            e.preventDefault();
            const emailField = document.querySelector('#email');
            const password = document.querySelector('#password');
            const confirmPassword = document.querySelector('#confirmPassword');
            let formArray = [{email: emailField.value},{password: password.value},{confirmPassword: confirmPassword.value}];
            validationHelper(formArray, this.$el);
        }

        const checkAsyncValidate = (e) => {
            e.preventDefault();
            let headerRequest = new Headers();
            headerRequest.append("Content-Type", "application/json");
            const url = 'http://tasks.smartjs.academy/validate/email';
            const passwordField = document.querySelector('#password');
            const urlUser = 'http://tasks.smartjs.academy/users';
            let emailField = document.querySelector('#email');
            let emailData = JSON.stringify({
                email:  emailField.value
            });
            let registerData = {
                email:      emailField.value,
                password:   passwordField.value
            };
            let registerUserRequest = {
                method:         'POST',
                headers:        headerRequest,
                body:           emailData
            };
            let tempThis = this;
            fetch(url, registerUserRequest).then(data => data.json()).then(
                function(response){
                    for (let key in response) {
                        if (key === 'success' && response[key] === true) {
                            registerUserRequest.body = JSON.stringify(registerData);
                            fetch(urlUser, registerUserRequest).then(data => data.json()).then(
                                function(response){
                                    tempThis.resolveF(response);
                                    tempThis.remove();
                                },
                                function(reject){
                                    throw new Error('Some error with your data. More detailier:' + reject);
                                }
                            );
                        }
                        else {
                            validationHelper([{'async-email':"registered"}], tempThis.$el);
                        }
                    }
                },
                function(reject){
                    throw new Error('Some error with your data. More detailier:' + reject);
                }
            );
        }

        checkValidate(e);

        if (this.$el.find('span.'+rootStyles['visible-error']).size() === 0) {
            checkAsyncValidate(e);
        }

    },

    render: function (){
        const html = template(viewTemplate)({});
        this.$el.append(html);
        styleHelper(this.el, rootStyles, 'btn-primary');
        styleHelper(this.el, styles);
        return this.$el;
    },
});

export default RegistrationView;