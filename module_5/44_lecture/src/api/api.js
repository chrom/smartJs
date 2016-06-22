import {RegistrationForm} from '../views/index';
import {LoginForm} from '../views/index';
import {ConfirmPopup} from '../views/index';

export let api =  {

	initialize: function (key, value) {
		this[key] = value;
	},

	login: function () {
		let loginPopup = new LoginForm();
		loginPopup.render();
		$('.control-panel-block').html(loginPopup.$el);
		return loginPopup.promise;
	},

	register: function () {
		let regPopup = new RegistrationForm();
		regPopup.render();
		$('.control-panel-block').html(regPopup.$el);
		this.initialize('registration',regPopup);
		return regPopup.promise;
	},

	removeRegister: function(){
		if (this['registration']!==undefined) { this['registration'].remove() }
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
		let confirmPopup = new ConfirmPopup();
		confirmPopup.render();
		$('html body').append(confirmPopup.$el);
		return confirmPopup.promise;
	},

	loadUsers: function (url, useToken) {
		return new Promise((resolve, reject) => {
					const urlUsersList = url;
					let headerUserListRequest = new Headers();
					if (useToken === true) {
						headerUserListRequest.append("Authorization", "Bearer "+this.gettoken());
					}
					else {
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
		this.token = value;
	},

	gettoken: function () {
		if (!this.token) {
			this.token = null;
		}
		return this.token
	}

};