import {CoordinateData} from '../../typeDefined/DefinedTypes'

/**
 * 버블차트 데이터 획득
 */
class BubbleChartRepository{
    chartData = [
        {x:1, y: 14.48713485},
        {x:2, y: 1.624007036},
        {x:3, y: 7.180016478},
        {x:4, y: 13.01433899},
        {x:5, y: 5.736882707},
        {x:6, y: -4.838236661},
        {x:7, y: -0.581043139},
        {x:8, y: 8.166580473},
        {x:9, y: 0.168569657},
        {x:10, y:2.322247681},
        {x:11, y:-0.427583022},
        {x:12, y:-2.373704364},
        {x:13, y:0.236379361},
        {x:14, y:2.363869847},
        {x:15, y:-4.345656314},
        {x:16, y:-3.798033303},
        {x:17, y:-4.082222349},
        {x:18, y:-4.322167445},
        {x:19, y:1.380764095},
        {x:20, y:-0.290699109},
        {x:21, y:-9.362055453},
        {x:22, y:2.817561301},
        {x:23, y:-0.302290032},
        {x:24, y:-0.302290032},
        {x:25, y:-1.912681161},
        {x:26, y:-0.758950795},
        {x:27, y:0.061251618},
        {x:28, y:7.670602771},
        {x:29, y:-1.161588358},
        {x:30, y:7.473361467},
        {x:31, y:14.37809614},
        {x:32, y:21.65064296},
        {x:33, y:29.65134318},
        {x:34, y:54.18480578},
        {x:35, y:100.4701676},
        {x:36, y:171.0989004},
        {x:37, y:258.3429852},
        {x:38, y:375.3187667},
        {x:39, y:503.717225},
        {x:40, y:640.2008361}
    ];

    ArrayDataWrappingAboutClass(dataArray) {
        var returnArray = new Array();
        dataArray.forEach(element => {
            returnArray.push(new CoordinateData(element.x, element.y));
        });
        return returnArray;
    }

    get bubblechartData() {
        return this.ArrayDataWrappingAboutClass(this.chartData);
    }

    exportMethod() {
        return {
            bubblechartData: this.bubblechartData
        }
    }

}

const bubblechartRepository = new BubbleChartRepository().exportMethod();

export {bubblechartRepository};