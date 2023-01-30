import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  tite: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    ref: Schema.Types.ObjectId,
    required: true,
  },
  post: {
    ref: Schema.Types.ObjectId,
    required: true,
  },
});

export default model('Comment', commentSchema);
