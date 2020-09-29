import{observable, computed, action} from 'mobx';
import {BubbleChartData, ChartDefault} from '../interfaces/interface';
import TypeControl from '../utils/dataTypeControlUtil';

export default class CoordinateData{

    @observable data = new Array();
    

    constructor(data) {
        const coordinateArray = TypeControl.bubbleCoordinateData();
        var chartDefault = new ChartDefault();        
        if(data) {
            if(data.label) chartDefault.label = data.label;
            if(data.backgroundColor) chartDefault.backgroundColor = data.backgroundColor;
            if(data.borderColor) chartDefault.borderColor = data.borderColor;
            if(data.type) chartDefault.type = data.type;
            if(data.radius) chartDefault.radius = data.radius;
            if(data.pointStype) chartDefault.pointStype = data.pointStype;
            if(data.showLine) chartDefault.showLine = data.showLine;
            if(data.fill) chartDefault.fill = data.fill;
            if(data.data) chartDefault.data = data.data;
        }
        this.data.push(new BubbleChartData(chartDefault));
    }
    
    @computed
    get ownData() {
        return this.data;
    }

    @action
    doFixData(data, index) {
        if(index) {
            this.data.datasets[index].tofixData(data);
        }
    }
}