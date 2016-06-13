import { View } from 'backbone';
import template from 'lodash/template';
import userTemplate from './UserView.html';
import styles from './UserView.css';
import rootStyles from '../../../dist/styles.css';
import styleHelper from '../../helper/style';
import $ from 'jquery';
import {api} from '../../api/api';

const BackboneUserView = View.extend({
	template: template(userTemplate),
	styles: styles,

	events: {
		'click .person-item': 'toggleUserStatus',
	},

	toggleUserStatus: function(e){
		e.preventDefault();
		api.confirm().then(
			data => {
				if (e.target.classList.contains(styles['activated-false'])) {
					api.activateUser(e.target, this);
				}
				else {
					api.deactivateUser(e.target, this);
				}
			}
		);
	},

	render: function() {
		console.log(this);
		this.$el.append(this.template({
			person: this.model.attributes
		}));
		styleHelper(this.el, styles);
		return this.$el;
	}

});

export default BackboneUserView;