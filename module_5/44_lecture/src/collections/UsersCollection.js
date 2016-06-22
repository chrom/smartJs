import {Collection} from 'backbone';
import User from '../models/User';
import {api} from '../api/api';

var UsersCollection = Collection.extend({
    model: User,
    skip: 0,
    total: 0,

    setData: function(data) {
        this.skip = data.skip;
        this.total = data.total;
    },

    fetch: function(url, tempThis, useToken){
        return new Promise(function(resolve, reject) {
            api.loadUsers(url, useToken).then(
                data => {
                    tempThis.setData(data);
                    tempThis.set(data.page, {reset:true});
                    resolve(data);
                });
        });
    }

});

export default UsersCollection;