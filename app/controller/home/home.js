const Model = require('../../mocks/article/list');

const list = Model.getPage(1, 10);

exports.index = async ctx => {
    await ctx.render('home/home.js', list);
};
