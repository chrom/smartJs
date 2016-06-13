/**
 * Created by user on 11.06.2016.
 */
import {registrationForm} from '../views/index';
import {LoginForm} from '../views/index';
import {ConfirmPopup} from '../views/index';

export let api =  {

	initialize: function () {
		// вытягявает из localstorage token если он есть и грузить сразу список
		this.registrBtn = null;
		this.loginBtn = null;
		this.logoutBtn = null;
	},

	login: function () {
		var loginPopup = new LoginForm();
		loginPopup.render();
		$('.control-panel-block').html(loginPopup.$el);
		return loginPopup.promise;
	},

	savelogin: function(){

	},

	register: function () {
		var regPopup = new registrationForm();
		regPopup.render();
		$('.control-panel-block').html(regPopup.$el);
		return regPopup.promise;
	},

	setRequestHeader: function(){
		let userStatusHeader = new Headers();
		userStatusHeader.append("Authorization", "Bearer "+ api.gettoken());
		return {
			method:         'POST',
			headers:        userStatusHeader
		};
	},

	activateUser: function (modelView, tempThis) {
		let header = this.setRequestHeader();
		let url = 'http://tasks.smartjs.academy/users/'+modelView.getAttribute('data-id')+'/activate';
		let userThis = tempThis;
		fetch(url, header).then(data => data.json()).then(
				function(response){
					modelView.classList.remove(userThis.styles['activated-false']);
					modelView.classList.add(userThis.styles['activated-true']);
				},
				function(reject){
					throw new Error('Some error with your data. More detailier:' + reject);
				}
		);
	},

	deactivateUser: function (modelView, tempThis) {
		let header = this.setRequestHeader();
		let url = 'http://tasks.smartjs.academy/users/'+modelView.getAttribute('data-id')+'/deactivate';
		let userThis = tempThis;
		fetch(url, header).then(data => data.json()).then(
				function(response){
					modelView.classList.remove(userThis.styles['activated-true']);
					modelView.classList.add(userThis.styles['activated-false']);
				},
				function(reject){
					throw new Error('Some error with your data. More detailier:' + reject);
				}
		);
	},

	confirm: function () {
		var confirmPopup = new ConfirmPopup();
		confirmPopup.render();
		$('html body').append(confirmPopup.$el);
		return confirmPopup.promise;
	},

	loadUsers: function (useToken) {
		return new Promise((resolve, reject) => {
					const urlUsersList = 'http://tasks.smartjs.academy/users';
					let headerUserListRequest = new Headers();
					if (useToken === true) {
						console.log('1');
						headerUserListRequest.append("Authorization", "Bearer "+this.gettoken());
					}
					else {
						console.log('2');
						headerUserListRequest.append("Authorization", "Bearer "+ localStorage.getItem('token'));
					}
					let userListRequest = {
						method:         'GET',
						headers:        headerUserListRequest
					};
					fetch(urlUsersList, userListRequest).then(data => data.json()).then(
							function(response){
								resolve(response);
							},
							function(reject){
								throw new Error('Some error with your data. More detailier:' + reject);
							})
					});
	},

	settoken: function (value) {
		localStorage.setItem('token', value);
		this.token = value;
	},

	gettoken: function () {
		if (!this.token) {
			this.token = null;
		}
		return this.token
	}

};