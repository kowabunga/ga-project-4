import Post from '../models/post.js';

async function allPosts(req, res) {
  try {
    const posts = await Post.find({});
    if (!posts) return res.status(400).json({ error: 'Cannot find posts...' });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(400).json({ error: 'No post found' });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function index(req, res) {
  try {
    const posts = await Post.find({ user: req.user._id });

    if (!posts) res.status(400).json({ error: 'Cannot find posts' });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function newPost(req, res) {
  try {
    const post = await Post.create(req.body);

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function edit(req, res) {
  try {
    let post = await Post.findOneAndUpdate(req.body._d, req.body, {
      new: true,
    });

    if (!post) return res.status(400).json({ error: 'No post found' });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deletePost(req, res) {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: 'Post deleted' });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export default {
  allPosts,
  getPostById,
  index,
  new: newPost,
  edit,
  delete: deletePost,
};
