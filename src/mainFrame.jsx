import React from 'react';
import ImageBaseBubbleChart from './bubble/imageBaseBubble';
import CanvasBaseBubbleChart from './bubble/canvasBaseBubble';
import WrappingBoxPlotChart from './boxplot/wrappingBoxplot';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import {BubbleChart, BubbleChartShape, RectangleLine} from './typeDefined/DefinedTypes'
import JSZip from 'jszip';

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
  }

  constructor(props) {
    super();

    const chartKeyCanvas = "canvas"
    var bubbleChartShapeCanvas = new BubbleChartShape("Bubble Chart(to Canvas)", 500, 300, 8);
    bubbleChartShapeCanvas.xAxesName = "싸이클";
    bubbleChartShapeCanvas.yAxesName = "값";
    props.root.chart.doBubbleChartSettingWithShape(bubbleChartShapeCanvas, chartKeyCanvas);
    var bubbleChartCanvas = new BubbleChart("분포통계", "#000000", "#000000", "bubble", 1);
    props.root.chart.doBubbleChartDataPullingWithMakeChart(bubbleChartCanvas, chartKeyCanvas, 'bubble');
    var rectangleLineCanvas = new RectangleLine("범위 선", "#CAA712", "#CAA712", "scatter", 1, 0);
    props.root.chart.doBubbleChartDataPullingWithMakeChart(rectangleLineCanvas, chartKeyCanvas, 'rectangle');

    const chartKeyImage = "image"
    var bubbleChartShapeImage = new BubbleChartShape("Bubble Chart(to image)", 290, 180, 8);
    bubbleChartShapeImage.xAxesName = "싸이클";
    bubbleChartShapeImage.yAxesName = "값";
    props.root.chart.doBubbleChartSettingWithShape(bubbleChartShapeImage, chartKeyImage);
    var bubbleChartImage = new BubbleChart("분포통계", "#000000", "#000000", "bubble", 1);
    props.root.chart.doBubbleChartDataPullingWithMakeChart(bubbleChartImage, chartKeyImage, 'bubble');
    var rectangleLineImage = new RectangleLine("범위 선", "#CAA712", "#CAA712", "scatter", 0, 1);
    props.root.chart.doBubbleChartDataPullingWithMakeChart(rectangleLineImage, chartKeyImage, 'rectangle');

    this.state = {
      boxplotData: {
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

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <CanvasBaseBubbleChart storeKey="canvas" doCollectChartImage={this.doCollectChartImage} />
        <ImageBaseBubbleChart storeKey="image" doCollectChartImage={this.doCollectChartImage} />
        <div style={{padding: "20px 0px 20px 0px"}}>
          <button onClick={this.doClickDownload}>모두 다운(따로)</button>
          <button onClick={this.doClickDownloadAboutZip}>모두 다운(압축)</button>
        </div>
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