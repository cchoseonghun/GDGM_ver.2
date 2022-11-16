const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const raidSchema = new mongoose.Schema({
    name: String, 
    d_date: String, 
    d_time: String, 
    members: Array, 
    group_id: ObjectId, 
    group_name: String, 
});
module.exports = mongoose.model('Raid', raidSchema);