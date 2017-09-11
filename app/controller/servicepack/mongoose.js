exports.insertAll = async ctx => {
    for (const key in packages) {
        const data = packages[key];
        const serviceModel = ctx.model.Servicepack;
        const serviceEntity = new serviceModel(data);
        serviceEntity.save();
    }
};
exports.index = async ctx => {
    if (!ctx.query.id) {
        return;
    }
    ctx.body = await ctx.model.Servicepack.find({ id: ctx.query.id });
};

exports.list = async ctx => {
    ctx.body = await ctx.model.Servicepack.find({});
};
