const Users = require('../../api/v1/users/model');

const { badRequestError, UnauthorizedError, BadRequestError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const signinAuth = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('please provide email and password');
    }

    const result = await Users.findOne({ email: email });
    if (!result) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const isPasswordCorrect = await result.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = createJWT({ payload: createTokenUser(result) });
    console.log('test sigin');

    return token;
}

module.exports = { signinAuth }