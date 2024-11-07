const Blog = require('../models/blog');
const User = require('../models/user')

exports.index = async (req, res, next) => {
    try {
        const blog = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'fullname'],
                    as: 'user'
                    // required: true, // inner join
                }
            ]
        });
        return res.status(200).json(blog);
    } catch (err) {
        next(err);
    }
}
