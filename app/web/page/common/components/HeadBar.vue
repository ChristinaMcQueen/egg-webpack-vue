<template>
    <header>
        <nav class="nav">
            <transition-group name="slide" tag="ul" class="nav-wrap">
                <li :class="['nav-item', {active: item.active}]"
                    v-for="item in nav"
                    :key="item.value"
                    @click="jump(item)">
                    {{item.title}}
                </li>
            </transition-group>
        </nav>
    </header>
</template>

<style lang="less" scoped>
    .nav-wrap {
        color: #798d8f;
        border-bottom: 2px solid #f5f5f5;
        height: 44px;
        text-align: center;
        padding-left: 60px;
    }

    .nav-item {
        float: left;
        line-height: 42px;
        padding: 0 15px;
        cursor: pointer;
        &.active {
            color: #2c3e50;
            border-bottom: 2px solid #2c3e50;
        }
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: all 1s;
        // transition: opacity .5s
    }

    .slide-enter,
    .slide-leave-to {
        opacity: 0
    }
</style>

<script type="text/javascript">
    import config from '../config'

    export default {
        data() {
            return {
                nav: config.nav
            }
        },
        created() {
        },
        methods: {
            jump(param) {
                this.nav.forEach(item => {
                    if (item.value === param.value) {
                        item.active = true;
                    }
                    else {
                        item.active = false;
                    }
                });
                console.log(this);
                this.$router.push({
                    path: param.path
                })
            }
        }
    };
</script>