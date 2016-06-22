import PopupView from '../PopupView/popupView';
import template from 'lodash/template';
import viewTemplate from './LoginForm.html';
import styles from './LoginForm.css';
import styleHelper from '../../helper/style';
import rootStyles from '../../../dist/styles.css';
import {validationHelper} from '../../helper/error';
import {api} from '../../api/api';
import {history} from 'backbone';

const LoginView = PopupView.extend({
    template: template(viewTemplate),
    styles: styles,

    events: {
        'click #submit_login': 'userRequestF',
        'focus #login-form .form-control': 'removeErrorValidation',
        'click #login-form .close': 'removeView'
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
        const tempThis = this;
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
                    api.settoken(response.token);
                    if (tempThis.$el.find('#remember-me')[0].checked) {
                        localStorage.setItem('token', response.token);
                    }
                    tempThis.removeView();
                    tempThis.resolveF();
                },
                function(reject){
                    throw new Error('Some error with your data. More detailier:' + reject);
                }
            );
        }
    }
});

export default LoginView;