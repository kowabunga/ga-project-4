import Comment from '../models/comment.js';
import Post from '../models/post.js';
import Recipe from '../models/recipe.js';

async function newRecipeComment(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    console.log(recipe);

    recipe.comments.push(req.body);
    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function newPostComment(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);

    post.comments.push(req.body);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function edit(req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteComment(req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export default {
  newRecipeComment,
  newPostComment,
  edit,
  delete: deleteComment,
};
