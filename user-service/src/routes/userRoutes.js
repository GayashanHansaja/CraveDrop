import { Router } from 'express';
import { registerUser, getUserProfile, updateUser, deleteUserAccount, getUserById } from '../controllers/userController.js';
import { auth, logout, refreshToken, validate } from '../controllers/authController.js';
import { registerUserValidator, updateUserValidator } from '../validators/userValidators.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

// User routes
router
    .route('')
    .put(authenticateUser, updateUserValidator, updateUser)
    .delete(authenticateUser, deleteUserAccount)
    .get(authenticateUser, getUserProfile)

router.route('/register').post(registerUserValidator, registerUser)

// Auth routes
router.route('/auth').post(auth)
router.route('/refresh').post(refreshToken);
router.route('/validate').get(validate)
router.route('/logout').post(logout)

// router.route('/:id').get(getUserById)

export default router;
