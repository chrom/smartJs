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

    fetch: function(tempThis, useToken){
        return new Promise(function(resolve, reject) {
            api.loadUsers(useToken).then(
                data => {
                    tempThis.set(data.page, {remove:true});
                    resolve(data);
                },
                error => {
                    throw new Error('Some problem with request. More info: ' + error);
                });
        });
    }

});

export default UsersCollection;