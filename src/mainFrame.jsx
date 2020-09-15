import React from 'react';
import ReactDOM from 'react-dom';
import BubleChart from './bubble';
import ScatterChart from './scatter';
import ExampleChart from './exmaple';
import BoxplotChart from  './boxplot';
import randomValues from './randomValueGenerator';

const chartData = (state) => {
  var returnData = {datasets:[]}
  if(state.bubbleData) {
    returnData.datasets = returnData.datasets.concat(state.bubbleData.slice());
  }
  if(state.followLine) {
    returnData.datasets = returnData.datasets.concat(state.followLine.slice());
  }
  if(state.rectangleGuide) {
    returnData.datasets = returnData.datasets.concat(state.rectangleGuide.slice());
  }
  return returnData
}

const getValueExternal = (axesKey, minmax, targetObjectArray) => {
    var returnValue = 0;
    targetObjectArray.forEach((element) => {
        if(minmax === 'min') {
            returnValue = element[axesKey]<returnValue?element[axesKey]:returnValue
        }else if(minmax ==='max') {
            returnValue = element[axesKey]>returnValue?element[axesKey]:returnValue
        }
    });
    return returnValue;
}

var rectanglePoint = {x:40, y:100}

const mansData = [
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

const followLineData = [
    {x:1, y: 14.48713485},
    {x:10, y:2.322247681},
    {x:20, y:-0.290699109},
    {x:30, y:7.473361467},
    {x:40, y:640.2008361}
];

const rectangleGuideData = [
  {x : 0, y : rectanglePoint.y},
  {x : rectanglePoint.x, y : rectanglePoint.y},
  {x : rectanglePoint.x, y : 0}
];

const boxplotData = [
  {
      min: 1,
      q1: 11,
      median: 30,
      q3: 41,
      max: 70
  },
  randomValues(100, 0, 20),
  randomValues(100, 20, 70),
  randomValues(100, 60, 100),
  randomValues(40, 50, 100),
  randomValues(100, 60, 120),
  randomValues(100, 80, 100)
];


class MainFrame extends React.Component {

  constructor(props) {
    super();
    this.state = {
      bubbleData: [
        {
          label: '분포통계',
          backgroundColor: "#ADD8E6", //점 색깔
          type:"bubble",
          data: mansData
          }
      ]
      ,followLine: [
        {
          label: '추적 선',
          type:"scatter",
          borderColor: "#9F999A", //선색깔
          borderWidth: 2, //선 두께
          radius:0, //데이터 원 크기(0은 제거)
          fill:false, // 넓이 채우기
          showLine:true, // 선그리기 여부
          data: followLineData
      }
      ]
      ,rectangleGuide: [
        {
          label: '범위 선?',
          type:"scatter",
          borderColor: "#CAA712", //선색깔
          borderWidth: 2, //선 두께
          lineTension:0, // 선 곡선정도
          radius:0, //데이터 원 크기(0은 제거)
          fill:false, // 넓이 채우기
          showLine:true, // 선그리기 여부
          data: rectangleGuideData
      }
      ]
      , boxplotData: {
        // define label tree
        labels: Array.from({length: boxplotData.length}, (v, i) => i + 1),
        datasets: [{
            label: '싸이클당 통계',
            backgroundColor: '#DD604B',
            borderColor: '#DD604B',
            borderWidth: 1,
            padding: 10,
            itemRadius: 0,
            data: boxplotData
        }]
      }
    }
  }
  render() {
    return (
      <div>
        <BubleChart 
          chartTitle="Bubble Chart"
          chartWidth="500" chartHeight="300"
          chartFontSize="15"
        //   minXAxes="0" maxXAxes="200"
        //   minYAxes="0" maxYAxes="200"
          xAxesName="싸이클" yAxesName="값"
          data={chartData(this.state)}
        />
        <BoxplotChart
          chartTitle="BoxPlot Chart"
          chartWidth="500" chartHeight="300"
          minXAxes="0" maxXAxes="200"
          minYAxes="0" maxYAxes="200"
          xAxesName="싸이클" yAxesName="횟수"
          data={this.state.boxplotData}
        />
      </div>
    );
  }
}

export {MainFrame}