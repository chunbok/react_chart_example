import RiderStore from './StoreExample'
import ChartStore from './store/ChartStore';

class RootStore {
    constructor() {
        this.rider = new RiderStore(this);
        this.chart = new ChartStore(this);
    }
}

export default RootStore;