import PopupView from '../PopupView/popupView';
import template from 'lodash/template';
import viewTemplate from './confirmPopup.html';
import styles from './confirmPopup.css';
import rootStyles from '../../../dist/styles.css';
import styleHelper from '../../helper/style';

const RegistrationView = PopupView.extend({
    template  : template(viewTemplate),

    events: {
        'click .ok-link-btn': 'successRequest',
        'click .remove-link-btn': 'removeView'
    },

    successRequest: function (e) {
        e.preventDefault();
        this.resolveF();
        this.removeView();
    },

    render: function (){
        const html = template(viewTemplate)({});
        this.$el.append(html);
        this.$el[0].classList.add('overlay-wrapper');
        styleHelper(this.el, rootStyles, 'btn-primary');
        styleHelper(this.el, styles);
        return this.$el;
    }
});

export default RegistrationView;