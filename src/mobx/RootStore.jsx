import ChartStore from './store/ChartStore';

class RootStore {
    constructor() {
        this.chart = new ChartStore(this);
    }
}

export default RootStore;