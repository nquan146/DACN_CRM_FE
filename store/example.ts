import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
@Module({
  name: 'example',
  namespaced: true,
  stateFactory: true
})
export default class MyStoreModule extends VuexModule {
  public test: string = 'initial'

  @Mutation
  public setTest (val: string) {
    this.test = val
  }

  @Action
  public showMessage () {
    alert('this is action')
  }
}
