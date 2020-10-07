import {bubblechartRepository} from '../repository/chartRepository';
import {autobind} from 'core-decorators';
import {action, computed, observable} from 'mobx';
import {asyncAction} from 'mobx-async-action';

@autobind
class ChartStore {
    @observable
    bubbleChartStore = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    doBubbleChartDataPullingWithMakeChart(chart, chartKey) {
        const chartData = bubblechartRepository.bubblechartData;
        chart.setDataInsert(chartData);
        this.bubbleChartStore[chartKey] = chart;
    }

    @action
    doInitBubbleCharStore() {
        this.bubbleChartList = {};
    }

    @computed
    getBubbleChartByKey(chartKey) {
        return this.bubbleChartStore[chartKey];
    }
}

export default ChartStore;