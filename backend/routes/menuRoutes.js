import express from "express"
const router = express.Router();
const { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protectChef } = require('../middleware/authMiddleware');

router.post('/', protectChef, createMenuItem);
router.get('/', getMenuItems);
router.put('/:id', protectChef, updateMenuItem);
router.delete('/:id', protectChef, deleteMenuItem);

export default router;