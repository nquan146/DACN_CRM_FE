<template>
  <a-result
    :status="error.statusCode.toString()"
    :title="error.statusCode"
    :sub-title="error.message"
  >
    <template #extra>
      <nuxt-link to="/">
        <a-button type="primary">
          Back to home
        </a-button>
      </nuxt-link>
    </template>
  </a-result>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'error'
})
export default class ErrorPage extends Vue {
  @Prop({ required: true })
  private error!:Vue
}
</script>
