const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: String,
  summary: String,
  description: String,
  author: String,
  created_at: Date,
  status: { type: String, enum: ['Want to read', 'Reading', 'Completed'] },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Book', BookSchema);
