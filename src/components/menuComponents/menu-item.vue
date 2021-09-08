<template>
    <el-sub-menu v-if="menu.children&&menu.children.length" :index="menu.name">
        <template #title>
            <i :class="menu.icon" class="icon_i"></i>
            <span>{{menu.title}}</span>
        </template>
        <template v-for="menuChild in menu.children" :key="menuChild.name">
            <!-- 使用递归，标签名和该组件name保持一致 -->
            <menuItem :menu="menuChild">
            </menuItem>
        </template>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.title" @click="toPage(menu)">
        <i :class="menu.icon" class="icon_i"></i>
        <template #title>{{menu.title}}</template>
    </el-menu-item>
</template>

<script>
    export default {
        name: 'menuItem',
        props: ['menu'],
        data() {
            return {

            }
        },
        created() {
            // console.log('000', this.menu)
        },
        methods: {
            toPage(menuInfo) {
                this.$router.push({
                    path:menuInfo.path
                })
            }
        }
    }
</script>
<style lang="less">
</style>