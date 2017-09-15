module.exports = app => {
    app.get('/', 'home.home.index');
    app.get('/introduce', 'introduce.introduce.index');
};
