import { Schema, model } from 'mongoose';
import Comment from './comment.js';

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [Comment],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

export default model('Blog', blogSchema);
