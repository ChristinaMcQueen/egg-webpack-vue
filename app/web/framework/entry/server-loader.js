module.exports = function() {
    return `
        import Server from 'server';
        import Page from '${this.resourcePath.replace(/\\/g, '\\\\')}';
        export default Server.render({ ...Page });
    `;
};
