
const routes = require('../../routes/routes');

const tagsRoles = {
    Admin: {
        POST: [
            routes.login,
            routes.profile,
        ],
        GET: [
            routes.home,
            routes.searchProfile,
        ],
    },
};

module.exports = tagsRoles;
