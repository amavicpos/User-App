const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// TODO: Edit user model to add team
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
    biography: {
        type: String
    },
    picture: {
        type: Schema.Types.ObjectId,
        ref: 'images'
    }
});

module.exports = User = mongoose.model('users', UserSchema);
