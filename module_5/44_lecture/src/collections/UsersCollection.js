import {Collection} from 'backbone';
import User from '../models/User';
import {api} from '../api/api';

var UsersCollection = Collection.extend({
    model: User,

    fetch: function(useToken){
        return new Promise(function(resolve, reject) {
            api.loadUsers(useToken).then(
                data => {
                    resolve(data);
                },
                error => {
                    throw new Error('Some problem with request. More info: ' + error);
                });
        });
    }
});

export default UsersCollection;