import { View } from 'backbone';
import template from 'lodash/template';
import viewTemplate from './UserCard.html';
import styles from './UserCard.css';
import styleHelper from '../../helper/style';

const BackboneView = View.extend({
    template  : template(viewTemplate),

    initialize: function () {
        this.collection.fetch();
        this.collection.on('add remove update', () => this.render());
    },
    
    render: function () {
        const html = template(viewTemplate)({
            items: this.collection.models,
        });
        this.$el.html(html);
        styleHelper(this.el, styles);

        return this.$el;
    },
});

export default BackboneView;