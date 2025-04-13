import { Router } from 'express';
import { registerUser, getUserProfile, updateUser, deleteUserAccount, getUserById } from '../controllers/userController.js';
import { auth, refreshToken, validate } from '../controllers/authController.js';
import { registerUserValidator, updateUserValidator } from '../validators/userValidators.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

// User routes
router.post('/', registerUserValidator, registerUser);
router.get('/', authenticateUser, getUserProfile);
router.put('/', authenticateUser, updateUserValidator, validate, updateUser)
router.delete('/', authenticateUser, deleteUserAccount)

// Auth routes
router.post('/auth', auth)
router.post('/refresh', refreshToken);
router.get('/validate', validate)

router.get('/:id', getUserById)

export default router;
