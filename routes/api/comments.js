import express from 'express';
const router = express.Router();
import commentsCtrl from '../../controllers/comments.js';

import auth from '../../config/auth.js';

/*---------- Protected Routes ----------*/
router.post('/recipe/:id/comments', auth, commentsCtrl.newRecipeComment);
router.post('/post/:id/comments', auth, commentsCtrl.newPostComment);
router.put('/recipe/comments/:id', auth, commentsCtrl.editRecipeComment);
router.put('/post/comments/:id', auth, commentsCtrl.editPostComment);
router.delete('/recipe/comments/:id', auth, commentsCtrl.deleteRecipeComment);
router.delete('/post/comments/:id', auth, commentsCtrl.deletePostComment);

export default router;
