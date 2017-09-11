process.env.VUE_ENV = 'server';

require('egg').startCluster({
    baseDir: __dirname,
    workers: process.env.WORKERS,
    port: normalizePort(process.env.PORT || '8901')
});

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) { // named pipe
        return val;
    }
    if (port >= 0) { // port number
        return port;
    }
    return false;
}
