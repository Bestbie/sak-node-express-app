const bcrypt = require('bcrypt');
const qs = require('qs');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Blog = require('../models/blog');
// const sequelize = require('../config/db');

exports.index = async (req, res, next) => {
    try {
        // const user = await User.findAll({
        //     attributes: ['id', 'fullname'],
        //     order: [['id', 'desc']]
        // });
        // const user = await User.findAll({
        //     attributes: { exclude: ['password', 'permission'] },
        //     order: [['id', 'desc']]
        // });
        // const user = await User.findAll({
        //     attributes: { exclude: ['password'] },
        //     where: {
        //         permission: 'admin'
        //     },
        //     order: [['id', 'desc']]
        // });

        // Raw SQL
        // const sql = 'select id,fullname,email from users order by id desc';
        // const user = await sequelize.query(sql, {
        //     type: sequelize.QueryTypes.SELECT
        // });

        // Pagination
        // http://localhost:4000/api/v1/users?page=1&pageSize=3
        const { page, pageSize } = req.query;
        const user = await User.findAll({
            attributes: { exclude: ['password', 'permission'] },
            order: [['id', 'desc']],
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize)
        });
        // find total Record
        const totalRecord = await User.count();
        // ลองดู findAndCountAll() เพิ่มเติมจะได้ไม่ต้องเขียน count เอง

        return res.status(200).json({
            total: totalRecord,
            data: user
        });

    } catch (err) {
        // return res.status(500).json({message: "เกิดข้อผิดพลาด โปรดลองใหม่"});
        next(err);
    }
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(Number(id), {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Blog,
                    attributes: ['id', 'title', 'approve'],
                    as: 'blogs',
                },
            ],
            order: [
                ['blogs', 'id', 'desc']
            ]
        });
        // ถ้าไม่พบ user ให้ response 404 และบอกว่า ไม่พบข้อมูล
        if (!user) {
            const err = new Error('ไม่พบข้อมูล');
            err.statusCode = 404;
            throw err;
        }

        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

exports.search = async (req, res, next) => {
    try {
        const { fullname, permission } = qs.parse(req.query); // express.urlencoded({ extended: true }
        // const { fullname, permission } = req.query; // express.urlencoded({ extended: false }
        const user = await User.findAll({
            attributes: { exclude: ['password', 'permission'] },
            where: {
                // fullname: { [Op.like]: `%${fullname}%` }
                [Op.or]: [
                    { fullname: { [Op.like]: `%${fullname}%` } },
                    { permission: { [Op.like]: `%${permission}%` } },
                ]
            },
            order: [['id', 'desc']],
        });
        // ถ้าค้นไม่เจอให้ 404
        if (user.length === 0) {
            const err = new Error('ไม่พบข้อมูล');
            err.statusCode = 404;
            throw err;
        }

        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

exports.register = async (req, res, next) => {
    try {
        //validation
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            const err = new Error('ข้อมูลไม่ถูกต้อง');
            err.statusCode = 422;
            err.validation = validation.array();
            throw err;
        }

        const { fullname, email, password } = req.body;
        // check อีเมล์ ซ้ำ
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            const err = new Error('มีอีเมล์นี้ในระบบแล้ว โปรดลองใหม่');
            err.statusCode = 400;
            throw err;
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // insert new user to table
        const newUser = await User.create({
            fullname: fullname,
            email: email,
            password: hashPassword
        });

        return res.status(201).json({
            message: 'ลงทะเบียนสำเร็จ',
            user: {
                id: newUser.id,
                fullname: newUser.fullname
            }
        });

    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        //validation
        const validation = validationResult(req);
        if (!validation.isEmpty()) {
            const err = new Error('ข้อมูลไม่ถูกต้อง');
            err.statusCode = 422;
            err.validation = validation.array();
            throw err;
        }

        const { email, password } = req.body;
        // check อีเมล์ ว่ามีในระบบหรือไม่
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const err = new Error('ไม่พบผู้ใช้นี้ในระบบ');
            err.statusCode = 401;
            throw err;
        }
        // เปรียบเทียบรหัสผ่าน
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            const err = new Error('รหัสผ่านไม่ถูกต้อง');
            err.statusCode = 401;
            throw err;
        }
        // สร้าง jwt token ให้ client สำหรับยืนยันตัวตนกับเรา
        const token = jwt.sign(
            { user_id: user.id, user_permission: user.permission },
            process.env.JWT_KEY,
            { expiresIn: '2d' }
        );

        return res.status(200).json({
            message: 'เข้าระบบสำเร็จ',
            access_token: token
        });

    } catch (err) {
        next(err);
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fullname } = req.body;

        // เช็ค id ว่ามีหรือไม่
        const user = await User.findByPk(Number(id));
        if (!user) {
            const err = new Error('ไม่พบข้อมูลผู้ใช้ในระบบ');
            err.statusCode = 404;
            throw err
        }
        // update User.update()
        const result = await User.update({
            fullname: fullname
        }, {
            where: { id: id }
        });
        return res.status(200).json({
            message: 'แก้ไขข้อมูลสำเร็จ',
            result: result, // 0 คือไม่มี row ถูกแก้ไข และ 1 คือ มี row ถูกแก้ไขจริง
        });
    } catch (err) {
        next(err);
    }
}

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        // ลบ row
        const resultNumber = await User.destroy({
            where: { id: Number(id) }
        })

        // ถ้า resultNumber เท่ากับ 0 ให้ 404
        if (resultNumber === 0) {
            const err = new Error('ไม่พบข้อมูลผู้ใช้ในระบบ');
            err.statusCode = 404;
            throw err;
        }

        return res.status(200).json({
            message: 'ลบข้อมูลสำเร็จ',
            result: resultNumber
        });
    } catch (err) {
        next(err);
    }
}

// get user profile (ต้องมี token ก่อน หรือล็อกอินก่อน)
exports.me = (req, res, next) => {
    return res.status(200).json(req.user);
}
