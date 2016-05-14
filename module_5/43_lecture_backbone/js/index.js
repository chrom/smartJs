// https://gist.github.com/xanf/ea1b0e828229505d8a79
import {Router, history} from 'backbone';
import User from './models/User';
import {UserCard} from './views/index';
import UserCollection from './collection/UsersCollection'
window.User = User;

function showUsers() {
    var users = new UserCollection();
    users.url = 'http://jsonplaceholder.typicode.com/todos';
    const view = new UserCard({collection: users, el: '.userList' });
}

const AppRouter = Router.extend({
    routes: {
        '/': 'showUsers',
    },
    showUsers,
});

const app = new AppRouter();
window.addEventListener('load', () => history.start());
