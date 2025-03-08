const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const { BadRequestError } = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const createOrganizer = async (req) => {
    const { organizer, email, password, confirmPassword, name, role } = req.body;
    if (password !== confirmPassword) {
        throw new BadRequestError('Password tidak sama');
    }

    const result = await Organizers.create({ organizer });

    const users = await Users.create({
        email,
        name,
        password,
        role,
        organizer: result._id,
    });

    userObject = users.toObject();
    delete userObject.password;

    return userObject; //return ini bukan users karena supaya password nya sudah dihapus
}

const createUsers = async (req, res) => {
    const { name, password, role, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        throw new BadRequestError('password dan konfirmasi password tidak sama');
    }

    const result = await Users.create({
        name,
        email,
        organizer: req.user.organizer,
        password,
        role
    });

    return result;
}

module.exports = { createOrganizer, createUsers };