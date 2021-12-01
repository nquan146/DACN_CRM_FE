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
            <a-icon type="dislike" />
            <span>Khiếu nại</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="listfeedback">
          <nuxt-link to="/feedbackmanagement">
            <a-icon type="smile" />
            <span>Phản hồi</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item v-if="$auth.user.active_View_Lead" key="listlead">
          <nuxt-link to="/leadsmanagement">
            <a-icon type="star" />
            <span>Cơ hội</span>
          </nuxt-link>
        </a-menu-item>

        <a-sub-menu v-if="$auth.user.active_View_User" key="user">
          <span slot="title"><a-icon type="user" /><span>Người dùng</span></span>

          <a-menu-item key="group-user">
            <nuxt-link to="/groupuser">
              <a-icon type="user" />Nhóm người dùng
            </nuxt-link>
          </a-menu-item>

          <a-menu-item key="table-user">
            <nuxt-link to="/usermanagement">
              <a-icon type="user" />Danh sách
            </nuxt-link>
          </a-menu-item>
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
        <div class="user-wrapper">
          <div class="content-box">
            <a-dropdown>
              <span class="action ant-dropdown-link user-dropdown-menu">
                <a-avatar class="avatar" size="small" :src="'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png'" />
                <span>{{ $auth.user.name }}</span>
              </span>
              <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
                <a-menu-item key="logout">
                  <a href="#" @click.prevent="logout">
                    <a-icon type="logout" />
                    <span>Đăng xuất</span>
                  </a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
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
import moment from 'moment'
import { Vue, Component } from 'vue-property-decorator'
import 'moment/locale/vi'
moment.locale('vn')
@Component({ middleware: 'auth-admin' })
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
<style scoped lang="less">
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
.action {
        cursor: pointer;
        padding: 0 12px;
        display: inline-block;
        transition: all 0.3s;
        height: 100%;
        color: rgba(0, 0, 0, 0.65);

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }

        .avatar {
          margin: 20px 8px 20px 0;
          color: #1890ff;
          background: hsla(0, 0%, 100%, 0.85);
          vertical-align: middle;
        }

        .icon {
          font-size: 16px;
          padding: 4px;
        }
      }
</style>
