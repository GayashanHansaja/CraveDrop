import { body } from 'express-validator';

const sriLankaMobileRegex = /^07\d{8}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

console.log("validator start")
export const registerUserValidator = [
    body('firstname').notEmpty().withMessage('First name is required'),
    body('lastname').notEmpty().withMessage('Last name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*()_\-+=<>?{}[\]~]/).withMessage('Password must contain a special character'),
    body('contactNumber')
        .optional()
        .matches(sriLankaMobileRegex).withMessage(
            'Invalid Sri Lankan mobile number. Must start with 07 and have 10 digits.'
        ),
];

export const updateUserValidator = [
    body('email').optional().isEmail().withMessage('Invalid email format'),
    body('contactNumber')
        .optional()
        .matches(sriLankaMobileRegex).withMessage(
            'Invalid Sri Lankan mobile number. Must start with 07 and have 10 digits.'
        ),
    body('password')
        .optional()
        .matches(strongPasswordRegex).withMessage(
            'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
        ),
];
