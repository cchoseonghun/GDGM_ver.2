const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const inviteSchema = new mongoose.Schema({
    code: String, 
    group_id: ObjectId, 
    created_date: Date, 
    expired: Boolean, 
});
module.exports = mongoose.model('Invite', inviteSchema);