const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require('bcryptjs'); //digunakan untuk hash password

let userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama harus diisi'],
            minLength: [3, 'Panjang nama minimal 3 karakter'],
            maxLength: [30, 'Panjang nama maksimal 30 karakter'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email harus diisi'],
        },
        password: {
            type: String,
            required: [true, 'Password harus diisi'],
            minLength: 6
        },
        role: {
            type: String,
            required: [true, 'Role harus diisi'],
            default: 'admin',
        },
        organizer: {
            type: String,
            required: [true, 'Penyelenggara harus diiisi'],
            ref: 'Organizer',
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log('compare password');
    const isMatch = await bcrypt.compare(candidatePassword, this.password);

    return isMatch;
}

module.exports = model('User', userSchema);