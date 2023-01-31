import express from 'express';
const router = express.Router();
import recipesCtrl from '../../controllers/recipes.js';

import auth from '../../config/auth.js';

/*---------- Public Routes ----------*/
router.get('/all', recipesCtrl.allRecipes);
router.get('/:id', recipesCtrl.getRecipeById);

/*---------- Protected Routes ----------*/
router.get('/', auth, recipesCtrl.index);
router.post('/', auth, recipesCtrl.new);
router.put('/:id', auth, recipesCtrl.edit);
router.delete('/:id', auth, recipesCtrl.delete);

export default router;
 