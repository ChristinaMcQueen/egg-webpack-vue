<template>
    <div>
        <Header></Header>
        <Content>
            <div slot="content">
                <slot name="main"></slot>
            </div>
        </Content>
    </div>
</template>
<script type="text/babel">
    import Header from 'page/common/Header';
    import Content from 'page/content/content';

    export default {
        components: {
            Header,
            Content
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../../web/asset/css/global.css";
</style>
