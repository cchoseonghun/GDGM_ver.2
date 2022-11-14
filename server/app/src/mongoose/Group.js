const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    name: String, 
    members: Array, 
});
module.exports = mongoose.model('Group', groupSchema);