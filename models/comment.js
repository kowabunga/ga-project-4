import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

export default commentSchema;
