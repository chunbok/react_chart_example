import Subscribe from './dataSubscribeUtil'
import {BubbleChartData, CoordinatePoint} from '../interfaces/interface';

/**
 * json을 검사해서 coordinate Object Array를 만듬
 *  */
const bubbleCoordinateData = () => {
    const datas = Subscribe.doBubbleChartDataSubscribe();
    var coordinateArray = new Array();
    if(datas && datas.constructor == Array) {
        data.forEach(item => {
            if(item.constructor == Object && item.x && item.y) {
                coordinateArray.push(new CoordinatePoint(item.x, item.y));
            }
        });
    }
    return coordinateArray;
}

export default TypeControl = {
    bubbleCoordinateData: bubbleCoordinateData
};