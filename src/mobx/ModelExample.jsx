import {autobind} from 'core-decorators'
import {action, computed} from 'mobx';

@autobind
class RiderModel {
  constructor(data) {
    extendObservable(this, data);
  }

  // 라이더명과 지점명을 합친 getter
  // 모델 자신의 비즈니스로직을 가지고 있다. 모델 레이어가 없다면 아마도 아래 예제 처럼
  // 비즈니스 로직이 널리 퍼졌을 것이다.
  @computed
  get riderWithAgency() {
    return `${this.riderName}(${this.agencyName})`;
  }
  
  @action
  changeRiderName(riderName) {
    this.riderName = riderName;
  }
  
  // 렌더링 대상이 아니면 @computed는 필요없다.
  isActive() {
    return this.status === 'ACTIVE';
  }
}

export default RiderModel;