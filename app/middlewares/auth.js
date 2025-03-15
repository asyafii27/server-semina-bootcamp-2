const { UnauthorizedError, UnauthenticatedError } = require('../errors');
const { isTokenValid } = require('../utils/index')

const authenticateUser = async (req, res, next) => {
    try {
        let token;

        // check header
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw new UnauthenticatedError('Authentication Invalid');
        }

        const payload = isTokenValid({ token });
        console.log('payload')
        console.log(payload)
        // attack the user and his permissions to the req object
        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            organizer: payload.organizer,
            id: payload.userId
        }

        console.log('user')
        console.log(req.user)

        next();

    } catch (err) {
        next(err)
    }
}

const authorizeRoles = (...roles) => {
    console.log('authorize');
    console.log(roles);
    return (req, res, next) => {
        console.log(req.user.role)
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route');
        }
        next();
    }
}

module.exports = { authenticateUser, authorizeRoles }