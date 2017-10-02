import users_model from './users';
import tasks_model from './tasks';

const uri = 'mongodb://dbuser:dbpass@ds155674.mlab.com:55674/express-restful-to-do-list';

const db = mongoose.connect(uri);

module.exports = db;