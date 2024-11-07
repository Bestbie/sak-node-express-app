const express = require('express');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const os = require('node:os');
const formData = require("express-form-data");

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');

// middlewares
const errorHandler = require('./middlewares/error-handler');
const isAuth = require('./middlewares/passport-jwt');

const app = express();

app.use(cors()); // allow all origin
app.use(helmet());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' })); // อย่าลืมปรับตามความเหมาะสม
app.use(formData.parse({
    uploadDir: os.tmpdir(),
    autoClean: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // localhost:4000/
app.use('/api/v1/users', usersRouter); // localhost:4000/api/v1/users
app.use('/api/v1/blog', [isAuth], blogRouter); // localhost:4000/api/v1/blog

// app.use('/api/v2/users', usersRouterV2); // localhost:4000/api/v2/users
// app.use('/api/v2/blog', blogRouterV2); // localhost:4000/api/v2/blog

// error middleware ต้องอยู่ล่างสุดเสมอ
app.use(errorHandler);

module.exports = app;
