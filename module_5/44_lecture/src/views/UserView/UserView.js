import { View } from 'backbone';
import template from 'lodash/template';
import userTemplate from './UserView.html';
import styles from './UserView.css';
import rootStyles from '../../../dist/styles.css';
import styleHelper from '../../helper/style';
import $ from 'jquery';
import {appState} from '../app/appState';

const BackboneUserView = View.extend({
	template: template(userTemplate),

	events: {
		'click .person-item': 'toggleUserStatus',
	},

	toggleUserStatus: function(e){
		console.log(appState);
		let userStatusHeader = new Headers();
		userStatusHeader.append("Authorization", "Bearer "+ appState.token);
		let url;
		let userStatusRequest = {
			method:         'POST',
			headers:        userStatusHeader
		};
		if (e.target.classList.contains(styles['activated-false'])) {
			url = 'http://tasks.smartjs.academy/users/'+e.target.getAttribute('data-id')+'/activate';
			fetch(url, userStatusRequest).then(data => data.json()).then(
				function(response){
					e.target.classList.remove(styles['activated-false']);
					e.target.classList.add(styles['activated-true']);
				},
				function(reject){
					throw new Error('Some error with your data. More detailier:' + reject);
				}
			);
		}
		else {
			url = 'http://tasks.smartjs.academy/users/'+e.target.getAttribute('data-id')+'/deactivate';
			fetch(url, userStatusRequest).then(data => data.json()).then(
				function(response){
					e.target.classList.remove(styles['activated-true']);
					e.target.classList.add(styles['activated-false']);
				},
				function(reject){
					throw new Error('Some error with your data. More detailier:' + reject);
				}
			);
		}
	},

	render: function() {
		this.$el.append(this.template({
			person: this.model.attributes
		}));
		styleHelper(this.el, styles);
		return this.$el;
	}

});

export default BackboneUserView;