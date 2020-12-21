const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
let Student = new Schema({
    student_name: {type: String},
    type_student_document: {type: String},
    number_student_document: {type: Number},
    course: {type: String},
    score: {type: Number}
});
module.exports = mongoose.model('Student', Student);