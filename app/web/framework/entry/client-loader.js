module.exports = function() {
    console.log('*****************************************');
    console.log(this.resourcePath);
    console.log('*****************************************');
    return `
        import Client from 'client';
        import Page from '${this.resourcePath.replace(/\\/g, '\\\\')}';
        export default Client.render({ ...Page });
    `;
};
