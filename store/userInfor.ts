import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { UserRole } from '~/src/enums/UserRole'

export interface IUserInfor {
  id:number,
  username: string,
  role: UserRole
}

@Module({
  name: 'user-information',
  namespaced: true,
  stateFactory: true
})
export default class MyStoreModule extends VuexModule {
  public userInfor: IUserInfor | null = null

  @Mutation
  public setUserInfor (value: IUserInfor) {
    this.userInfor = value
  }
}
