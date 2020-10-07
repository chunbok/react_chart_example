import riderRepository from './RepositoryExample';
import RiderModel from './ModelExample';
import {autobind} from 'core-decorators';
import {action, computed, observable} from 'mobx';
import {asyncAction} from 'mobx-async-action';

@autobind
class RiderStore {
  @observable
  riderList = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 비동기인 경우 @action 대신 @asyncAction
  @asyncAction
  async *findAll(params) {
    const { data, status } = yield riderRepository.findAll(params);
    this.riderList = data.map(rider => new RiderModel(rider));
  }

  // 라이더 리스트에서 특정 요소를 제거 하는 메소드 인데 @observable로 지정된 property의
  // 변경은 store의 메소드에 의해서만 가능하다(@action decorator를 추가한)
  // 그렇게 때문에 비즈니스 로직이 여기저기 퍼져 나가는 것을 애초에 막을 수
  // 있어서 객체지향적인 코드를 유지 해 나갈 수 있다.
  @action
  removeRider(index) {
    this.riderList.splice(index, 1);
  }

  // 비즈니스 로직이 포함된 getter다 @computed 데코레이터는 반환하는 값이 변경되 었을 때
  // rerendering을 하는데 값이 변경 되었다 하더라도 변경되기 전과 같은 값이라면 불필요하게 
  // rerendering을 하지 않는다.
  @computed
  get activeRiders() {
    return this.riderList.filter(rider => rider.isActive);
  }
}

export default RiderStore;