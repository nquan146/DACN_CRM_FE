<template>
  <a-layout id="components-layout-custom-trigger" style="min-height: 100vh">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      :class="['sider', null]"
      breakpoint="sm"
    >
      <div class="logo">
        <img class="logo-img" src="https://picsum.photos/100/100?random=1">
        <h1>CRM</h1>
      </div>
      <a-menu
        v-model="selectedKeys"
        :open-keys.sync="openKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="index">
          <nuxt-link to="/">
            <a-icon type="dashboard" />
            <span>Trang chủ</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="listcustomer">
          <nuxt-link to="/customermanagement">
            <a-icon type="team" />
            <span>Khách hàng</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="listemployee">
          <nuxt-link to="/employee">
            <a-icon type="idcard" />
            <span>Nhân viên</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="listservice">
          <nuxt-link to="/servicemanagement">
            <a-icon type="global" />
            <span>Dịch vụ</span>
          </nuxt-link>
        </a-menu-item>

        <a-menu-item key="listcomplaint">
          <nuxt-link to="/complaintmanagement">
            <a-icon type="frown" />
            <span>Khiếu nại</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="listfeedback">
          <nuxt-link to="/feedbackmanagement">
            <a-icon type="smile" />
            <span>FeedBack</span>
          </nuxt-link>
        </a-menu-item>

        <a-sub-menu key="data">
          <span slot="title"><a-icon type="appstore" /><span>Data</span></span>

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
        <a class="user-wrapper" href="#" @click.prevent="logout">Đăng xuất</a>
      </a-layout-header>

      <a-layout-content
        :style="{ margin: '10px 8px', padding: '10px', overflow: 'auto' }"
      >
        <nuxt />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Nhóm 10 ©2021
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class MenuLayout extends Vue {
  private collapsed: boolean = false;
  private selectedKeys: string[] = [];
  private collapsible: Boolean = false;
  private openKeys: string[] = [];

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
.logo-img {
  width: 32px;
  height: 32px;
}
.logo-text {
  font-size: 32px;
  color: aliceblue;
  text-align: left;
  width: 100%;
  padding-left: 10px;
}
.user-wrapper {
  float: right;
  height: 100%;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 25px;
}
</style>
