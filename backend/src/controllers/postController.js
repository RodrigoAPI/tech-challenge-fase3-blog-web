const Post = require('../models/Post');

async function getAllPosts(req, res) {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
}

async function getPostById(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post nao encontrado' });
  res.json(post);
}

async function createPost(req, res) {
  const { title, content, author } = req.body;
  const post = await Post.create({ title, content, author });
  res.status(201).json(post);
}

async function updatePost(req, res) {
  const { title, content, author } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, author },
    { returnDocument: 'after', runValidators: true }
  );
  if (!post) return res.status(404).json({ message: 'Post nao encontrado' });
  res.json(post);
}

async function searchPosts(req, res) {
  const { q } = req.query;
  const regex = new RegExp(q || '', 'i');
  const posts = await Post.find({
    $or: [{ title: regex }, { content: regex }],
  }).sort({ createdAt: -1 });
  res.json(posts);
}

async function deletePost(req, res) {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post nao encontrado' });
  res.status(204).send();
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
};
