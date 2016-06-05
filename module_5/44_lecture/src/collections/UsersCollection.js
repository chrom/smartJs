import {Collection} from 'backbone';
import User from '../models/User';

var UsersCollection = Collection.extend({
    model:User,
});

export default UsersCollection;