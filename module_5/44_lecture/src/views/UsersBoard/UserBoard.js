import {View} from 'backbone';
import template from 'lodash/template';
import viewTemplate from './UserBoard.html';
import styles from './UserBoard.css';
import styleHelper from '../../helper/style';
import {UserView} from '../index';
import $ from 'jquery';

const BackboneView = View.extend({
    template  : template(viewTemplate),
    el: '.content',

    initialize: function(){
        this.render();
    },

    render: function(){
        const fragment = document.createDocumentFragment();
        this.collection.each(function(user){
            const userView = new UserView({model: user});
            fragment.appendChild(userView.render()[0]);
        }, this);
        this.el.appendChild(fragment);
        styleHelper(this.el, styles);
        return this;
    }

});

export default BackboneView;