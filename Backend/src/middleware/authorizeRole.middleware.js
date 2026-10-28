
function authorizeRoleMiddleware(role) {

    return function (req, res, next) {

        if(req.user.role !== role) {

            return res.status(403).json({
                msg: 'Forbidden: You do not have the required role to access this resource.'
            })
        }

        next();
    } 

};

module.exports = authorizeRoleMiddleware;