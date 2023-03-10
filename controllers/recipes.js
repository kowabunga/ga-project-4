import Recipe from '../models/recipe.js';

async function allRecipes(req, res) {
  try {
    const recipes = await Recipe.find({}).populate('user');

    if (!recipes)
      return res.status(400).json({ error: 'Cannot find recipes...' });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getRecipeById(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user');
    if (!recipe) return res.status(400).json({ error: 'No recipe found' });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function index(req, res) {
  try {
    const recipes = await Recipe.find({ user: req.user._id });

    if (!recipes) res.status(400).json({ error: 'Cannot find recipes...' });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function create(req, res) {
  try {
    req.body.ingredients = req.body.ingredients.split(',');

    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function edit(req, res) {
  try {
    let recipe = await Recipe.findOneAndUpdate(req.body._id, req.body, {
      new: true,
    });

    if (!recipe) return res.status(400).json({ error: 'No recipe found' });

    if (!recipe.user.equals(req.user._id))
      return res.status(400).json({ error: 'User mismatch' });

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteRecipe(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe.user.equals(req.user._id))
      return res.status(400).json({ error: 'User mismatch' });

    await recipe.delete();

    res.status(200).json({ msg: 'Recipe deleted' });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export default {
  allRecipes,
  getRecipeById,
  new: create,
  index,
  edit,
  delete: deleteRecipe,
};
