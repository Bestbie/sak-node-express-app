const isAdmin = (req, res, next) => {
    if (req.user.permission === 'admin') {
        next();
    } else {
        return res.status(403).json({message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ สำหรับ Admin เท่านั้น'});
    }
}
module.exports = isAdmin;
