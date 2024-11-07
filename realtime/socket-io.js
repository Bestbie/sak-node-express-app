const { Server } = require('socket.io');

const io = new Server({
    cors: {
        origin: 'http://localhost:5173', // allow origin
    }
});

io.on('connection', (socket) => {
    io.emit('welcome', 'ยินดีต้อนรับสู่ Bestbie');
});

module.exports = io;