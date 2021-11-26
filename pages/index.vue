<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Trang thống kê
      </h1>
    </div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" :title="sdsd" total="￥126,560">
          <a-tooltip :title="dsd" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term"></span>
              12%
            </trend>
            <trend flag="down">
              <span slot="term"></span>
              11%
            </trend>
          </div>
          <template slot="footer"><span>￥ 234.56</span></template>
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import MenuItem from 'ant-design-vue/types/menu/menu-item'
@Component({
  layout: 'menu',
  name: 'index'
})
export default class IndexPage extends Vue {
  created () {

  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
