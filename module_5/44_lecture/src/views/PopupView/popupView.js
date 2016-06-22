/**
 * Prototype for registration form, login form and confirm popup
 */
import { View, history } from 'backbone';
import rootStyles from '../../../dist/styles.css';
import template from 'lodash/template';
import styleHelper from '../../helper/style';

const PopupView = View.extend({

	initialize: function () {
		this.promise = new Promise((resolve, reject) => {
			this.resolveF = resolve;
			this.rejectF = reject;
		});
	},

	removeView: function(){
		this.$el.remove();
		history.navigate('', { trigger: true });
	},

	render: function (){
		const html = this.template();
		this.$el.append(html);
		styleHelper(this.el, rootStyles, 'btn-primary');
		styleHelper(this.el, this.styles);
		return this.$el;
	}

});

export default PopupView;