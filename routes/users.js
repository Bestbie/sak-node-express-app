const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { index, show, search, register, login, update, remove, me } = require('../controllers/user-controller');
const isAuth = require('../middlewares/passport-jwt');
const isAdmin = require('../middlewares/check-admin');

/* localhost:4000/api/v1/users/me */
router.get('/me', [isAuth], me); // get user profile

/* localhost:4000/api/v1/users/ */
router.get('/', [isAuth, isAdmin], index); // admin only

/* localhost:4000/api/v1/users/search?fullname=JJ&permission=admin */
router.get('/search', search);

/* localhost:4000/api/v1/users/3 */
router.get('/:id', show);

/* localhost:4000/api/v1/users/register */
router.post('/register', [
    check('fullname').trim().notEmpty().withMessage('ชื่อ สกุลห้ามว่าง'),
    check('email').trim().notEmpty().withMessage('อีเมล์ห้ามว่าง')
    .isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
    check('password').trim().notEmpty().withMessage('รหัสผ่านห้ามว่าง')
    .isLength({min: 3}).withMessage('รหัสผ่านต้องอย่างน้อย 3 ตัวอักษร'),
] ,register);

/* localhost:4000/api/v1/users/login */
router.post('/login', [
    check('email').trim().notEmpty().withMessage('อีเมล์ห้ามว่าง')
    .isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
    check('password').trim().notEmpty().withMessage('รหัสผ่านห้ามว่าง')
    .isLength({min: 3}).withMessage('รหัสผ่านต้องอย่างน้อย 3 ตัวอักษร'),
] ,login);

/* localhost:4000/api/v1/users/3 */
router.put('/:id', update);

/* localhost:4000/api/v1/users/3 */
router.delete('/:id', remove);

module.exports = router;
