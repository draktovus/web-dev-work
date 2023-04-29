const users = require('../models/users')

module.exports = {
    parseAuthorizationHeader() {
        return (req, res, next) => {
            const token = req.headers.authorization?.split(' ')[1];
            if (token) {
                users.verifyTokenAsync(token).then(user => {
                    req.user = user;
                    next()
                }).catch(err => {
                    next({ code: 401, message: err })
                });
            }
            else {
                next();
            }
        }
    },
    requireLogin(requiresAdmin = false) {
        return (req, res, next) => {
            if (req.user) {
                if (req.user.role !== 'admin' && !requiresAdmin) {
                    next({
                        code: 403,
                        message: "This resource is admin only."
                    })
                }
                else {
                    next();
                }
            }
            else {
                next({
                    code: 401,
                    message: "You must be logged in to access this resource."
                })
            }
        }
    }
}