const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // console.log(jwt_payload.user_id);
    try {
        const user = await User.findByPk(Number(jwt_payload.user_id), {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            return done(null, user); // ส่งข้อมูล user ต่อไปที่ req (เวลาใช้เขียน req.user)
        }
    } catch (err) {
        done(err);
    }
}));

const isAuth = passport.authenticate('jwt', { session: false });

module.exports = isAuth;
