<template>
  <div class="home_warpper">
      <el-button type="primary" @click="test">测试vuex的模块化</el-button>
      <span>{{testInfo||'--'}}</span>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data () {
    return {
    };
  },
  computed:{
    ...mapState({
      testInfo:state=>state.test.testInfo
    })
  },
  components: {},

  mounted(){
    console.log(this.testInfo)
  },

  methods: {
    ...mapMutations(['testSetInfo']),
    test(){
      this.testSetInfo('test')
    }
  }
}

</script>
<style lang='less' scoped>
</style>