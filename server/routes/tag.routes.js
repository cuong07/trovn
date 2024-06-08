import express from 'express';
import TagController from '../controllers/tag.controller.js';

const router = express.Router();

// router.get('/tag/:id');
router.get("/tag", TagController.getTags);

router.post('/tag', TagController.createTag);
router.delete('/tag/:id', TagController.deleteTag);

export default router;