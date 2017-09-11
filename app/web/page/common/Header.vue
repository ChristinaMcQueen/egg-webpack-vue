<template>
    <header>
        <nav class="nav">
            <ul>
                <li v-for="item in nav">{{item.title}}</li>
            </ul>
        </nav>
    </header>
</template>

<style lang="less">

</style>

<script type="text/javascript">
    import config from './config'
    export default {
        data() {
            return {
                nav: config.nav
            }
        },
        created() {
        }
    };
</script>