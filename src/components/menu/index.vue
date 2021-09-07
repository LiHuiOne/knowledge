<template>
    <div class="menu-warpper">
        <el-scrollbar style="height:100%">
            <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
                <template v-for="(menuItem,index) in menuList" :key="menuItem.name">
                    <!-- 使用递归组件 -->
                    <meunItem :menu="menuItem"></meunItem>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import {
        defineAsyncComponent
    } from 'vue'
    import {
        menuList
    } from './menu.js'

    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                menuList
            }
        },
        computed: {
            ...mapState({
                isCollapse: state => state.menuConfigInfo.isCollapse
            })
        },
        components: {
            meunItem: defineAsyncComponent(() => import('../menuComponents/menu-item.vue'))
        },
        methods: {

        },
    }
</script>

<style lang="less">
    .icon_i{
        margin-right: 6px;
        font-size: 16px;
        color: #ffffff !important;
    }
    .el-menu {
        // 解决1px elementui出现展开后子菜单宽度多出1px问题
        border: none;
        border-right-width: 0;
        background: #001C43;
    }

    //展开是的宽度，如果设置了最小宽度或者最大宽度，切换动画会产生不流畅问题
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }

    .el-sub-menu__title,
    .el-menu-item {
        color: #ffffff;
    }

    .el-menu-item:hover {
        background-color: rgba(36, 34, 34, 0.5);
    }

    .el-sub-menu__title:hover:hover {
        background-color: rgba(36, 34, 34, 0.5);
    }
</style>