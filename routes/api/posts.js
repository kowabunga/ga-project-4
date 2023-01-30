import express from 'express';
const router = express.Router();
import postsCtrl from '../../controllers/posts.js';

import auth from '../../config/auth.js';

/*---------- Public Routes ----------*/
router.get('/all', postsCtrl.allPosts);
router.get('/:id', postsCtrl.getPostById);

/*---------- Protected Routes ----------*/
router.get('/', auth, postsCtrl.index);
router.post('/', auth, postsCtrl.new);
router.put('/:id', auth, postsCtrl.edit);
router.delete('/:id', auth, postsCtrl.delete);

export default router;
