<template>
  <a-layout id="components-layout-custom-trigger" style="min-height: 100vh">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      breakpoint="sm"
      collapsed-width="0"
    >
      <div class="logo">
        <img class="logo-img" src="https://picsum.photos/100/100?random=1">
        <span class="logo-text">VJP</span>
      </div>
      <a-menu
        v-model="selectedKeys"
        :open-keys.sync="openKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="index">
          <nuxt-link to="/">
            <a-icon type="user" />Home
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="about">
          <nuxt-link to="/about">
            <a-icon type="play-circle" />About
          </nuxt-link>
        </a-menu-item>

        <a-sub-menu key="data">
          <span
            slot="title"
          ><a-icon type="appstore" /><span>Data</span></span>

          <a-menu-item key="data-user">
            <nuxt-link to="/data/user">
              <a-icon type="user" /> User
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="data-admin">
            <nuxt-link to="/data/admin">
              <a-icon type="user" /> Admin
            </nuxt-link>
          </a-menu-item>

          <a-sub-menu key="data-web">
            <span slot="title"><a-icon type="appstore" /><span>Web</span></span>

            <a-menu-item key="data-web-youtube">
              <nuxt-link to="/data/web/youtube">
                <a-icon type="user" /> Youtube
              </nuxt-link>
            </a-menu-item>

            <a-menu-item key="data-web-google">
              <nuxt-link to="/data/web/google">
                <a-icon type="user" /> google
              </nuxt-link>
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a href="#">breadcrumb/here</a>

        <a href="#" @click.prevent="logout">Logout</a>
      </a-layout-header>

      <a-layout-content :style="{ margin: '10px 8px', padding: '10px', background: '#fff', minHeight: '280px', overflow: 'auto' }">
        <nuxt />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        VJP©2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
})
export default class MenuLayout extends Vue {
  private collapsed:boolean = false
  private selectedKeys:string[] = []

  private openKeys: string[] = []

  created () {
    const menuKeysFromPath = this.$route.path.split('/')
    menuKeysFromPath.shift()
    menuKeysFromPath.pop()
    this.selectedKeys.push(this.$route.name || '')
    const combineKeys: string[] = []
    this.openKeys = menuKeysFromPath.map<string>((item: string) => {
      combineKeys.push(item)
      return combineKeys.join('-')
    })
  }

  private logout () {
    this.$auth.logout()
  }
}
</script>
<style scoped>

#components-layout-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-custom-trigger .trigger:hover {
  color: #1890ff;
}
#components-layout-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.logo {
  align-items: center;
  display: flex;
  flex-direction: row;
  background-color: transparent !important;
}
.logo-text {
  font-size: 32px;
  color: aliceblue;
  text-align: left;;
  width: 100%;
  padding-left: 10px;
}
.logo-img {
  width: 32px;
  height: 32px;
}
#Layer_1{
  background-color: transparent;
}
</style>
