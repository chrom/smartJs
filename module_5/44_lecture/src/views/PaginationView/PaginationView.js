import { View } from 'backbone';
import template from 'lodash/template';
import userTemplate from './PaginationView.html';
import styles from './PaginationView.css';
import styleHelper from '../../helper/style';
import $ from 'jquery';
import {UserBoard} from '../index';
import UserCollection from '../../collections/UsersCollection';

const PaginationView = View.extend({
    template: template(userTemplate),
    styles: styles,
    className:'navigation-block',
    tagName: 'section',

    events: {
        'click li': 'getCurrentPage',
    },

    initialize: function(){
        this.getPaginationList();
    },

    getPaginationList: function(data){
        let pageList = this.collection.total / 20;
        this.render(pageList);
    },

    getCurrentPage: function(e){
        e.preventDefault();
        this.remove();
        let currentLink  = e.target.getAttribute('data-step');
        let url = 'http://tasks.smartjs.academy/users/?skip='+20*parseInt(currentLink);
        const tempThis = this;
        this.collection.fetch(url, this.collection, false).then(
            function(data){
                if (data.error === undefined) {
                    let UsersListBoard = new UserBoard({collection: tempThis.collection});
                    let PaginationBoard = new PaginationView({collection: tempThis.collection});
                }
            }
        );
    },

    render: function(pageList) {
        this.$el.append(this.template({
            pagination: pageList
        }));
        $('.content').append(this.$el);
        styleHelper(this.el, styles);
        return this.$el;
    }

});

export default PaginationView;