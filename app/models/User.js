const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        required: true
    },
    picture: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    }
});

module.exports = User = mongoose.model('users', UserSchema);
