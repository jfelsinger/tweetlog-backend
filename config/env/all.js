var path = require('path'),
    root = path.normalize(__dirname + '/../..');

module.exports = {
    defaultController: 'index',
    defaultControllerMethod: 'render',
    root: root,
    port: process.env.PORT || 3000,
    db: process.env.MONGOHQ_URL,
    auth: {
        twitter: {
            consumerKey: 'fVKAAfrmLJLnHTOmIKzPpGOvS',
            consumerSecret: 'ggGQz959PIh5lrdgVwujMn6XLr0hrtPjE2rbm8esKhAybLY6xj',
        }
    }
};
