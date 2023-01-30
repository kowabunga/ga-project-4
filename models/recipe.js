import { Schema, model } from 'mongoose';
import Comment from './comment';

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
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  comments: [Comment],
});

export default model('User', recipeSchema);
