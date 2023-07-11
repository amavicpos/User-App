const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
        srcUrl: String
    }
});

module.exports = Image = mongoose.model('images', ImageSchema);
