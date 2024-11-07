module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "เกิดข้อผิดพลาด โปรดลองใหม่";
    const validation = err.validation;

    return res.status(statusCode).json({
        status_code: statusCode,
        message: message,
        validation: validation,
    });
}
