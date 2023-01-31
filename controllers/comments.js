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

async function editRecipeComment(req, res) {
  try {
    const recipe = await Recipe.find({ 'comments._id': req.params.id });

    if (!recipe) return res.status(400).json({ error: `Can't find comment` });

    const commentIdx = recipe[0].comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    recipe[0].comments.splice(commentIdx, 1, req.body);

    await recipe[0].save();

    res.status(200).json(recipe[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function editPostComment(req, res) {
  try {
    const post = await Post.find({ 'comments._id': req.params.id });

    if (!post) return res.status(400).json({ error: `Can't find comment` });

    const commentIdx = post[0].comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    post[0].comments.splice(commentIdx, 1, req.body);

    await post[0].save();

    res.status(200).json(post[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteRecipeComment(req, res) {
  try {
    const recipe = await Recipe.find({ 'comments._id': req.params.id });

    if (!recipe) return res.status(400).json({ error: `Can't find comment` });

    const commentIdx = recipe[0].comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    recipe[0].comments.splice(commentIdx, 1);

    await recipe[0].save();

    res.status(200).json(recipe[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deletePostComment(req, res) {
  try {
    const post = await Post.find({ 'comments._id': req.params.id });

    if (!post) return res.status(400).json({ error: `Can't find comment` });

    const commentIdx = post[0].comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    post[0].comments.splice(commentIdx, 1);

    await post[0].save();

    res.status(200).json(post[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export default {
  newRecipeComment,
  newPostComment,
  editRecipeComment,
  editPostComment,
  deleteRecipeComment,
  deletePostComment,
};
