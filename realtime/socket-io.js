const { Server } = require('socket.io');
const { getTotalUserService } = require('../services/user-service');

const io = new Server({
    cors: {
        origin: 'http://localhost:5173', // allow origin (domain)
    }
});

let countClient = 0;

io.on('connection', async (socket) => {
    countClient++;
    io.emit('welcome', 'ยินดีต้อนรับสู่ Dashboard Best'); // ส่งไปยัง client
    console.log('Online: ' + countClient + ' client(s)');

    // ส่งข้อมูลจำนวนผู้ใช้ realtime ไปยัง client
    const countUser = await getTotalUserService();
    io.emit('user:totalUser', countUser);
    
    socket.on('disconnect', (reason) => {
        countClient--;
        console.log(reason);
        console.log('Online: ' + countClient + ' client(s)');
    });

});

module.exports = io;
