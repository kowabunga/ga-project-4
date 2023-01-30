import Comment from '../models/comment.js';
import Post from '../models/post.js';
import Recipe from '../models/recipe.js';

async function newRecipeComment(req, res) {}

async function newPostComment(req, res) {}

async function edit(req, res) {}

async function deleteComment(req, res) {}

export default {
  newRecipeComment,
  newPostComment,
  edit,
  delete: deleteComment,
};
