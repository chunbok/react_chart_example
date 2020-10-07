import React from 'react';
import ReactDOM from 'react-dom';
import ImageBaseBubbleChart from './bubble/imageBaseBubble';
import CanvasBaseBubbleChart from './bubble/canvasBaseBubble';
import WrappingBoxPlotChart from './boxplot/wrappingBoxplot';
<<<<<<< HEAD
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import {BubbleChart, BubbleChartShape, RectangleLine} from './typeDefined/DefinedTypes'
=======
import BoxplotChart from  './boxplot/boxplot';
import Modal from './modal/modal';
import JSZip from 'jszip';
>>>>>>> master

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
  [
    {x: 1, y: 0.000000000000 },
    {x: 2, y: 0.000000379683 },
    {x: 3, y: 0.000001048293 },
    {x: 4, y: 0.000002225697 },
    {x: 5, y: 0.000004299070 },
    {x: 6, y: 0.000007950221 },
    {x: 7, y: 0.000014379791 },
    {x: 8, y: 0.000025702077 },
    {x: 9, y: 0.000045640293 },
    {x: 10, y: 0.000080750910 },
    {x: 11, y: 0.000142579681 },
    {x: 12, y: 0.000251458331 },
    {x: 13, y: 0.000443190412 },
    {x: 14, y: 0.000780824851 },
    {x: 15, y: 0.001375388714 },
    {x: 16, y: 0.002422396611 },
    {x: 17, y: 0.004266141534 },
    {x: 18, y: 0.007512905503 },
    {x: 19, y: 0.013230308934 },
    {x: 20, y: 0.023298324026 },
    {x: 21, y: 0.041027290511 },
    {x: 22, y: 0.072245886502 },
    {x: 23, y: 0.127215969062 },
    {x: 24, y: 0.224001315036 },
    {x: 25, y: 0.394389842586 },
    {x: 26, y: 0.694291397015 },
    {x: 27, y: 1.221951800441 },
    {x: 28, y: 2.149730262267 },
    {x: 29, y: 3.779143760927 },
    {x: 30, y: 6.634996111333 },
    {x: 31, y: 11.622628996922 },
    {x: 32, y: 20.279426553555 },
    {x: 33, y: 35.143965546836 },
    {x: 34, y: 60.202740395258 },
    {x: 35, y: 101.165515406913}, 
    {x: 36, y: 164.868217894039}, 
    {x: 37, y: 256.636166244895}, 
    {x: 38, y: 375.244905231366}, 
    {x: 39, y: 508.772182441348}, 
    {x: 40, y: 637.615485798119}
  ],
  [
    {x: 1, y: 0.000000000000 },
    {x: 2, y: 0.000000379683 },
    {x: 3, y: 0.000001048293 },
    {x: 4, y: 0.000002225697 },
    {x: 5, y: 0.000004299070 },
    {x: 6, y: 0.000007950221 },
    {x: 7, y: 0.000014379791 },
    {x: 8, y: 0.000025702077 },
    {x: 9, y: 0.000045640293 },
    {x: 10, y: 0.000080750910 },
    {x: 11, y: 0.000142579681 },
    {x: 12, y: 0.000251458331 },
    {x: 13, y: 0.000443190412 },
    {x: 14, y: 0.000780824851 },
    {x: 15, y: 0.001375388714 },
    {x: 16, y: 0.002422396611 },
    {x: 17, y: 0.004266141534 },
    {x: 18, y: 0.007512905503 },
    {x: 19, y: 0.013230308934 },
    {x: 20, y: 0.023298324026 },
    {x: 21, y: 0.041027290511 },
    {x: 22, y: 0.072245886502 },
    {x: 23, y: 0.127215969062 },
    {x: 24, y: 0.224001315036 },
    {x: 25, y: 0.394389842586 },
    {x: 26, y: 0.694291397015 },
    {x: 27, y: 1.221951800441 },
    {x: 28, y: 2.149730262267 },
    {x: 29, y: 3.779143760927 },
    {x: 30, y: 6.634996111333 },
    {x: 31, y: 11.622628996922 },
    {x: 32, y: 20.279426553555 },
    {x: 33, y: 55.143965546836 },
    {x: 34, y: 80.202740395258 },
    {x: 35, y: 121.165515406913}, 
    {x: 36, y: 184.868217894039}, 
    {x: 37, y: 276.636166244895}, 
    {x: 38, y: 395.244905231366}, 
    {x: 39, y: 528.772182441348}, 
    {x: 40, y: 657.615485798119}
  ],
  [
    {x: 1, y: 0.000000000000 },
    {x: 2, y: 0.000000379683 },
    {x: 3, y: 0.000001048293 },
    {x: 4, y: 0.000002225697 },
    {x: 5, y: 0.000004299070 },
    {x: 6, y: 0.000007950221 },
    {x: 7, y: 0.000014379791 },
    {x: 8, y: 0.000025702077 },
    {x: 9, y: 0.000045640293 },
    {x: 10, y: 0.000080750910 },
    {x: 11, y: 0.000142579681 },
    {x: 12, y: 0.000251458331 },
    {x: 13, y: 0.000443190412 },
    {x: 14, y: 0.000780824851 },
    {x: 15, y: 0.001375388714 },
    {x: 16, y: 0.002422396611 },
    {x: 17, y: 0.004266141534 },
    {x: 18, y: 0.007512905503 },
    {x: 19, y: 0.013230308934 },
    {x: 20, y: 0.023298324026 },
    {x: 21, y: 0.041027290511 },
    {x: 22, y: 0.072245886502 },
    {x: 23, y: 0.127215969062 },
    {x: 24, y: 0.224001315036 },
    {x: 25, y: 0.394389842586 },
    {x: 26, y: 0.694291397015 },
    {x: 27, y: 1.221951800441 },
    {x: 28, y: 2.149730262267 },
    {x: 29, y: 3.779143760927 },
    {x: 30, y: 6.634996111333 },
    {x: 31, y: 11.622628996922 },
    {x: 32, y: 20.279426553555 },
    {x: 33, y: 75.143965546836 },
    {x: 34, y: 100.202740395258 },
    {x: 35, y: 141.165515406913}, 
    {x: 36, y: 204.868217894039}, 
    {x: 37, y: 296.636166244895}, 
    {x: 38, y: 415.244905231366}, 
    {x: 39, y: 548.772182441348}, 
    {x: 40, y: 677.615485798119}
  ],
  [
    {x: 1, y: 0.000000000000 },
    {x: 2, y: 0.000000379683 },
    {x: 3, y: 0.000001048293 },
    {x: 4, y: 0.000002225697 },
    {x: 5, y: 0.000004299070 },
    {x: 6, y: 0.000007950221 },
    {x: 7, y: 0.000014379791 },
    {x: 8, y: 0.000025702077 },
    {x: 9, y: 0.000045640293 },
    {x: 10, y: 0.000080750910 },
    {x: 11, y: 0.000142579681 },
    {x: 12, y: 0.000251458331 },
    {x: 13, y: 0.000443190412 },
    {x: 14, y: 0.000780824851 },
    {x: 15, y: 0.001375388714 },
    {x: 16, y: 0.002422396611 },
    {x: 17, y: 0.004266141534 },
    {x: 18, y: 0.007512905503 },
    {x: 19, y: 0.013230308934 },
    {x: 20, y: 0.023298324026 },
    {x: 21, y: 0.041027290511 },
    {x: 22, y: 0.072245886502 },
    {x: 23, y: 0.127215969062 },
    {x: 24, y: 0.224001315036 },
    {x: 25, y: 0.394389842586 },
    {x: 26, y: 0.694291397015 },
    {x: 27, y: 1.221951800441 },
    {x: 28, y: 2.149730262267 },
    {x: 29, y: 3.779143760927 },
    {x: 30, y: 6.634996111333 },
    {x: 31, y: 11.622628996922 },
    {x: 32, y: 20.279426553555 },
    {x: 33, y: 95.143965546836 },
    {x: 34, y: 120.202740395258 },
    {x: 35, y: 161.165515406913}, 
    {x: 36, y: 224.868217894039}, 
    {x: 37, y: 316.636166244895}, 
    {x: 38, y: 435.244905231366}, 
    {x: 39, y: 568.772182441348}, 
    {x: 40, y: 697.615485798119}
  ],
  [
    {x: 1, y: 0.000000000000 },
    {x: 2, y: 0.000000379683 },
    {x: 3, y: 0.000001048293 },
    {x: 4, y: 0.000002225697 },
    {x: 5, y: 0.000004299070 },
    {x: 6, y: 0.000007950221 },
    {x: 7, y: 0.000014379791 },
    {x: 8, y: 0.000025702077 },
    {x: 9, y: 0.000045640293 },
    {x: 10, y: 0.000080750910 },
    {x: 11, y: 0.000142579681 },
    {x: 12, y: 0.000251458331 },
    {x: 13, y: 0.000443190412 },
    {x: 14, y: 0.000780824851 },
    {x: 15, y: 0.001375388714 },
    {x: 16, y: 0.002422396611 },
    {x: 17, y: 0.004266141534 },
    {x: 18, y: 0.007512905503 },
    {x: 19, y: 0.013230308934 },
    {x: 20, y: 0.023298324026 },
    {x: 21, y: 0.041027290511 },
    {x: 22, y: 0.072245886502 },
    {x: 23, y: 0.127215969062 },
    {x: 24, y: 0.224001315036 },
    {x: 25, y: 0.394389842586 },
    {x: 26, y: 0.694291397015 },
    {x: 27, y: 1.221951800441 },
    {x: 28, y: 2.149730262267 },
    {x: 29, y: 3.779143760927 },
    {x: 30, y: 6.634996111333 },
    {x: 31, y: 11.622628996922 },
    {x: 32, y: 20.279426553555 },
    {x: 33, y: 115.143965546836 },
    {x: 34, y: 140.202740395258 },
    {x: 35, y: 181.165515406913}, 
    {x: 36, y: 244.868217894039}, 
    {x: 37, y: 336.636166244895}, 
    {x: 38, y: 455.244905231366}, 
    {x: 39, y: 588.772182441348}, 
    {x: 40, y: 717.615485798119}
  ]
];

const rectangleGuideData = [
  {x : 0 , y : 110.0},
  {x : 35.16632097182531 , y : 110},
  {x : 35.16632097182531 , y : -41.84020003045144}
];

const boxplotData = [
  {
      min: 957.0,
      q1: 1182.0,
      median: 1252.0,
      q3: 1298.5,
      max: 1422.0,
      outliers: [
        {
          params: {}
          , value: 0.0
        }
        ,{
          params: {}
          , value: 0.0
        }
        ,{
          params: {}
          , value: 595.0
        }
        ,{
          params: {}
          , value: 684.0
        }
        ,{
          params: {}
          , value: 736.0
        }
        ,{
          params: {}
          , value: 846.0
        }
        ,{
          params: {}
          , value: 933.0
        }
      ]
  },
  {
    min: 1089.0
    ,q1: 1222.0
    ,median: 1264.0
    ,q3: 1301.0
    ,max: 1422.0
    ,outliers: [
      {
        params: {
          tempKey: 11
        }
        , value: 957.0
      },
      {
        params: {
          tempKey: 12
        }
        , value: 1044.0
      }]
  },
  {
    min: 1089.0
    ,q1: 1227.0
    ,median: 1266.0
    ,q3: 1302.0
    ,max: 1422.0
    ,outliers: []
  }
];

@inject('root')
@observer
@autobind
class MainFrame extends React.Component {

  // componentDidMount() {
  //   this.bubbleChart.setChartOptionalData("Bubble Chart(to Canvas)", 290, 180, 8);
  //   this.bubbleChart = new BubbleChart("분포통계", "#000000", "#000000", "Bubble", 1);
  //   this.bubbleChart.xAxesName = "싸이클";
  //   this.bubbleChart.yAxesName = "값";
  //   const chartKey = "canvas"
  //   this.props.root.chart.doBubbleChartDataPullingWithMakeChart(this.bubbleChart, chartKey);
  // }

  exportImage = (chartImage, chartTitle) => {
    var element = document.createElement("a");
    element.href = chartImage;
    element.download = chartTitle;
    element.click();
    element.remove();
  };

  doClickDownload = () => {
    for(const[key, item] of Object.entries(this.state.chartItems)) {
      this.exportImage(item, key);
    }
  }
  
  doClickDownloadAboutZip = () => {
    var zip = new JSZip();
    for(const[key, item] of Object.entries(this.state.chartItems)) {
      zip.file(
        key + item.substring(item.indexOf("/") , item.indexOf(";")).replace("/", ".")
      , item);
    }
    zip.generateAsync({ type: "blob", }).then(function(contents) {
      var element = document.createElement("a");
      element.href = URL.createObjectURL(contents);
      element.download = "test.zip";
      element.click();
      element.remove();
    });


  }

  doCollectChartImage = (chartImage, chartTitle) => {
    var chartItems = this.state.chartItems;
    if(!chartItems) {
      var chartItem = {};
      chartItem[chartTitle] = chartImage;
      this.setState({
        chartItems: chartItem
      });
    }else {
      chartItems[chartTitle] = chartImage;
      this.setState({
        chartItems: chartItems
      });
    }

  }

  setImage = (chartImage) => {
    this.setState({
      bubbleChartImage : chartImage
    });
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  }
  
  closeModal = (drawnImage) => {
    this.setState({ isModalOpen: false });
    // bubbleChartImage = drawnImage;
    // drawnBubbleChartImage = "";
  }

  constructor(props) {
    super();
    const chartKey = "canvas"
    var bubbleChartShape = new BubbleChartShape("Bubble Chart(to Canvas)", 290, 180, 8);
    bubbleChartShape.xAxesName = "싸이클";
    bubbleChartShape.yAxesName = "값";
    props.root.chart.doBubbleChartSettingWithShape(bubbleChartShape, chartKey);
    var bubbleChart = new BubbleChart("분포통계", "#000000", "#000000", "bubble", 1);
    props.root.chart.doBubbleChartDataPullingWithMakeChart(bubbleChart, chartKey, 'bubble');
    var rectangleLine = new RectangleLine("범위 선", "#CAA712", "#CAA712", "scatter", 1, 1);
    props.root.chart.doBubbleChartDataPullingWithMakeChart(rectangleLine, chartKey, 'rectangle');

    this.state = {
      bubbleData: [
        {
          label: '분포통계',
          backgroundColor: "#000000", //점의 면 색깔
          borderColor: "#000000", //점의 선 색깔
          type:"bubble",
          radius:1, //데이터 원 크기(0은 제거)
          pointStyle: "circle", //점의 형태
          data: mansData
        }
      ]
      ,followLine: [
        {
          label: '추적 선' + 0,
          type:"scatter",
          borderColor: "#9F999A", //선색깔
          borderWidth: 1, //선 두께
          radius:0, //데이터 원 크기(0은 제거)
          fill:false, // 넓이 채우기
          showLine:true, // 선그리기 여부
          data: followLineData[0]
        }
        ,{
          label: '추적 선' + 1,
          type:"scatter",
          borderColor: "#9F99AA", //선색깔
          borderWidth: 1, //선 두께
          radius:0, //데이터 원 크기(0은 제거)
          fill:false, // 넓이 채우기
          showLine:true, // 선그리기 여부
          data: followLineData[1]
        }
        ,{
          label: '추적 선' + 2,
          type:"scatter",
          borderColor: "#9F99BA", //선색깔
          borderWidth: 1, //선 두께
          radius:0, //데이터 원 크기(0은 제거)
          fill:false, // 넓이 채우기
          showLine:true, // 선그리기 여부
          data: followLineData[2]
        }
        ,{
          label: '추적 선' + 3,
          type:"scatter",
          borderColor: "#9F99CA", //선색깔
          borderWidth: 1, //선 두께
          radius:0, //데이터 원 크기(0은 제거)
          fill:false, // 넓이 채우기
          showLine:true, // 선그리기 여부
          data: followLineData[3]
        }
        ,{
          label: '추적 선' + 4,
          type:"scatter",
          borderColor: "#9F99DA", //선색깔
          borderWidth: 2, //선 두께
          radius:0, //데이터 원 크기(0은 제거)
          fill:false, // 넓이 채우기
          showLine:true, // 선그리기 여부
          data: followLineData[4]
        }
      ]
      ,rectangleGuide: [
        {
          label: '범위 선?',
          type:"scatter",
          borderColor: "#CAA712", //선색깔
          borderWidth: 1, //선 두께
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
            outlierColor: '#DD604B', // 아웃라이어 색깔
            backgroundColor: '#DF8D80',
            borderColor: '#DD604B',
            borderWidth: 1,
            // padding: 7,
            // itemRadius: 5,
            data: boxplotData
        }]
      }
      ,isModalOpen: false
    }
  }

  render() {
    return (
      <div>
        <CanvasBaseBubbleChart storeKey="canvas" />
        <CanvasBaseBubbleChart storeKey="canvas" />
        <WrappingBoxPlotChart
          chartTitle="BoxPlot Chart"
          chartWidth="1000" chartHeight="500"
          // minXAxes="0" maxXAxes="200"
          // minYAxes="0"  // maxYAxes="2000"
          xAxesName="싸이클" yAxesName="횟수"
          data={this.state.boxplotData}
        />
      </div>
    );
  }
}

export {MainFrame}