import { View } from 'backbone';
import template from 'lodash/template';
import userTemplate from './PaginationView.html';
import styles from './PaginationView.css';
import rootStyles from '../../../dist/styles.css';
import styleHelper from '../../helper/style';
import $ from 'jquery';


const PaginationView = View.extend({
    template: template(userTemplate),
    styles: styles,
    currentPageValue: 1,
    el: '.content',

    setCollection: function(data){
        this.tempCollection = data;
        this.getPaginationList();
    },

    getPaginationList: function(){
        let pageList = this.tempCollection.total / 20;
        this.render(pageList);
    },

    getCurrentPage: function(){

    },

    render: function(pageList) {
        let ul = document.createElement('ul');
        for (let i = 0; i < pageList; i++) {
            ul.innerHTML = (this.template({pagination: pageList}))
        }
        this.$el.appendChild(ul);
        styleHelper(this.el, styles);
        return this;
    }

});

export default PaginationView;