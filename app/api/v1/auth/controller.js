const { StatusCodes } = require('http-status-codes');
const { signinAuth } = require('../../../services/mongoose/auth')

const signin = async (req, res, next) => {
    try {
        const result = await signinAuth(req);

        res.status(StatusCodes.CREATED).json({
            data: {
                token
                    : result
            }
        });
    } catch (err) {
        next(err);
    }
}
module.exports = {
    signin
}