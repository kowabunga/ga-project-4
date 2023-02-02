import Comment from '../models/comment.js';
import Post from '../models/post.js';
import Recipe from '../models/recipe.js';

async function newRecipeComment(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);

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
    const post = await Post.findById(req.params.id).populate('user');

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
    const recipe = (await Recipe.find({ 'comments._id': req.params.id }))[0];

    if (!recipe) return res.status(400).json({ error: `Can't find comment` });

    if (!recipe.user.equals(req.user._id))
      return res.status(400).json({ error: 'User mismatch' });

    const commentIdx = recipe.comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    recipe.comments.splice(commentIdx, 1, req.body);

    await recipe.save();

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function editPostComment(req, res) {
  try {
    const post = (
      await Post.find({ 'comments._id': req.params.id }).populate('user')
    )[0];

    if (!post) return res.status(400).json({ error: `Can't find comment` });

    if (!post.user.equals(req.user._id))
      return res.status(400).json({ error: 'User mismatch' });

    const commentIdx = post.comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    post.comments.splice(commentIdx, 1, req.body);

    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteRecipeComment(req, res) {
  try {
    const recipe = (
      await Recipe.find({ 'comments._id': req.params.id }).populate('user')
    )[0];

    if (!recipe) return res.status(400).json({ error: `Can't find comment` });

    if (!recipe.user.equals(req.user._id))
      return res.status(400).json({ error: 'User mismatch' });

    const commentIdx = recipe.comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    recipe.comments.splice(commentIdx, 1);

    await recipe.save();

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deletePostComment(req, res) {
  try {
    const post = (await Post.find({ 'comments._id': req.params.id }))[0];

    if (!post) return res.status(400).json({ error: `Can't find comment` });

    const commentIdx = post.comments.findIndex(comment =>
      comment._id.equals(req.params.id)
    );

    if (!post.comments[commentIdx].user.equals(req.user._id))
      return res.status(400).json({ error: 'User mismatch' });

    post.comments.splice(commentIdx, 1);

    await post.save();

    console.log(post);

    res.status(200).json(post);
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
