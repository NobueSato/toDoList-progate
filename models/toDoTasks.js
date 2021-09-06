// define the to-do list schema
// Add timestamps to Schema like this then createdAt and updatedAt will automatic generate for you
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const toDoSchema = new Schema({
    "name": {
        type: String,
        required: true
        },
    "createdOn": {
    type: Date,
    default: Date.now
    }
});

  // register the Company model using the companySchema
  // use the toDo-db collection in the db to store documents
  // If I'm gonna use this schema in the same file code below needed
  //  var toDos = mongoose.model("toDo-db", toDoSchema);
  // However, I want to use it in other files so export it
  module.exports = mongoose.model('toDo-db', toDoSchema);