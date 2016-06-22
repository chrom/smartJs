import { View } from 'backbone';
import {Router, history} from 'backbone';
import template from 'lodash/template';
import navTemplate from './NavView.html';
import $ from 'jquery';
import {api} from '../../api/api';

const BackboneNavView = View.extend({
	template: template(navTemplate),
	el: 'header',

	events: {
		'click #register-btn': 'registerAction',
		'click #login-popup-btn': 'loginAction',
		'click #logout-popup-btn': 'logoutAction',
		'click button': 'buttonAction'
	},

	registerSuccess: function(){
		this.$el.find('#register-btn')[0].style.display = 'none';
		this.$el.find('#login-popup-btn')[0].style.display = 'none';
		this.$el.find('#logout-popup-btn')[0].style.display = 'inline-block';
	},

	logoutSuccess: function(){
		this.$el.find('#register-btn')[0].style.display = 'inline-block';
		this.$el.find('#login-popup-btn')[0].style.display = 'inline-block';
		this.$el.find('#logout-popup-btn')[0].style.display = 'none';
	},

	registerAction: function(){
		history.navigate('#open-registration', { trigger: true });
	},

	loginAction: function(){
		history.navigate('#success-registration', { trigger: true });
	},

	logoutAction: function(){
		this.logoutSuccess();
		history.navigate('', { trigger: true });
	},

	buttonAction: function(){
		document.querySelector('.content').innerHTML = '';
	},

	render: function() {
		this.$el.append(this.template());
		return this.$el;
	}

});

export default BackboneNavView;