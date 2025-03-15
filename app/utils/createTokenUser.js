const mongoose = require('mongoose');

const createTokenUser = (user) => {
    return {
        name: user.name,
        userId: user._id,
        role: user.role,
        email: user.email,
        organizer: user.organizer
        // organizer: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Organizer' // Referensi ke koleksi Organizers
        // }

    };
};

module.exports = createTokenUser