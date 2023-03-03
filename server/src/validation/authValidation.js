import { check } from 'express-validator'

export const loginValidation = [
    check('email', 'bot an email').trim().isEmail(),
    check('password', 'password is required').trim().notEmpty(),
];

export const registerStudentValidation = [
    check('email', 'bot an email')
        .trim().isEmail(),
    check('password', 'the required password is at least 8 characters long')
        .trim().isLength({min: 8}).notEmpty(),
    check('fullName', 'fullName is required')
        .trim().notEmpty(),
    check('studentCode', 'the required studentCode is at least 8 characters long')
        .trim().isLength({min: 8}).notEmpty(),
]

export const registerTeacherValidation = [
    check('email', 'not an email').trim().isEmail(),
    check('password', 'the required password is at least 8 characters long')
        .trim().isLength({min: 8}).notEmpty(),
    check('fullName', 'fullName is required').trim().notEmpty(),
    check('teacherCode', 'the required teacherCode is at least 8 characters long')
        .trim().isLength({min: 8}).notEmpty(),
]