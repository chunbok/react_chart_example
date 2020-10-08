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
    doBubbleChartDataPullingWithMakeChart(chart, chartKey, chartType, index/* follow 차트만 씀 */) {
        // 데이터 획득구간을 key에 따라 다를수있으므로 분기처리 고려해야 함
        var chartData = {};
        switch(chartType) {
            case 'bubble':
                chartData = bubblechartRepository.bubblechartData;
                break;
            case 'follow':
                chartData = bubblechartRepository.followLineData(index);
                break;
            case 'rectangle':
                chartData = bubblechartRepository.rectangleLineData;
                break;
        }

        chart.setDataInsert(chartData);
        var chartByKey = this.bubbleChartStore[chartKey];
        if(!chartByKey) {
            console.error("반드시 형상을 먼저 만들고 셋팅해야 합니다.");
        }else {
            chartByKey.doAddDatasets(chart);
            this.bubbleChartStore[chartKey] = chartByKey;
        }
    }
    @action
    doBubbleChartSettingWithShape(chartShape, chartKey) {
        this.bubbleChartStore[chartKey] = chartShape;
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