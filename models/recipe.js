import { Schema, model } from 'mongoose';
import Comment from './comment.js';

const recipeSchema = new Schema({
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [Comment],
});

export default model('Recipe', recipeSchema);
