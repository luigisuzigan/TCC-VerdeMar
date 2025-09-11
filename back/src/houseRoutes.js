import express from 'express';
import { 
  getAllHouses, 
  getHouse, 
  createHouse, 
  updateHouse, 
  deleteHouse 
} from './houseController.js';
import authMiddleware from './authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllHouses);
router.get('/:id', getHouse);

// Protected routes
router.post('/', authMiddleware, createHouse);
router.put('/:id', authMiddleware, updateHouse);
router.delete('/:id', authMiddleware, deleteHouse);

export default router;
