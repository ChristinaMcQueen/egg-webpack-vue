module.exports = app => {
    class ServicepackController extends app.Controller {
        async index(ctx) {
            const data = await app.mysql.get('service_info', { id: ctx.query.id });
            data.qualifications = await app.mysql.select(
                'service_qualifications',
                { where: { info_id: ctx.query.id }}
            );
            for (const key in data) {
                if (key === 'targetUsers' || key === 'description' || key === 'process' || key === 'attentions') {
                    data[key] = data[key].split('\n');
                }
                if (key === 'qualifications') {
                    data[key].forEach(item => {
                        delete item.id;
                        delete item.info_id;
                    });
                }
            }
            ctx.body = data;
        }
        async list(ctx) {
            const data = await app.mysql.select('service_info', {});
            for (const key in data) {
                const item = data[key];
                item.qualifications = await app.mysql.select(
                    'service_qualifications',
                    { where: { info_id: item.id }}
                );
            }
            ctx.body = data;
        }
    }
    return ServicepackController;
};
