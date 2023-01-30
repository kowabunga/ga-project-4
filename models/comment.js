import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  tite: {
    type: String,
  },
  content: {
    type: String,
  },
  user: {
    ref: Schema.Types.ObjectId,
  },
  post: {
    ref: Schema.Types.ObjectId,
  },
});

export default commentSchema;
