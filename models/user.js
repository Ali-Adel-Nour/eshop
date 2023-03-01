const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        requried: true,
    },

    phone: {
        type: String,
        required: true,
    },

    street: {
        type: String,
        default: '',
    },
    apartment: {
        type: String,
        default: '',
    },

    city: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
        default: '',
    },
});
//id is more frontend friendly than _id
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.userSchema = userSchema;
