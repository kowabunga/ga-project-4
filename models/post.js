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
    ref: 'User',
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
    enum: ['tips and tricks', 'stories', 'knowledge center'],
  },
});

export default model('Post', blogSchema);
