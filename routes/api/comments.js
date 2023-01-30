import express from 'express';
const router = express.Router();
import commentsCtrl from '../../controllers/comments.js';

import auth from '../../config/auth.js';

/*---------- Protected Routes ----------*/
router.post('/recipe/:id/comments', auth, commentsCtrl.newRecipeComment);
router.post('/post/:id/comments', auth, commentsCtrl.newPostComment);
router.put('/comments/:id', auth, commentsCtrl.edit);
router.delete('/comments/:id', auth, commentsCtrl.delete);

export default router;
