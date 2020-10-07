import React from 'react';
import {Bubble} from 'react-chartjs-2';
import Modal from '../modal/modal';
import {inject, observer} from 'mobx-react';
import {autobind} from 'core-decorators';

const doCalcNextLine = (textInfo) => {
    textInfo.fontPositionY = textInfo.fontPositionY + (textInfo.fontPixel);
}

const fillTextAddLine = (ctx, textInfo) => {
    const fontInfo = textInfo.fontPixel + 'px '+ textInfo.fontStyle;

    ctx.font = fontInfo;
    ctx.fillStyle = textInfo.fontColor;
    ctx.fillText(textInfo.fillText, textInfo.fontPositionX, textInfo.fontPositionY);
}

@inject("root")
@observer // mobx observable state 를 rerendring 하기위에 선언해준다
@autobind // arrow function 없이 this를 자동으로 바인딩 시켜준다.
class CanvasBaseBubbleChart extends React.Component {


    exportImage = () => {
        var element = document.createElement("a");
        element.href = this.state.bubbleChartImage;
        element.download = "image.jpg";
        element.click();
        element.remove();
    };

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

    hideLineAll = () => {
        var chartThis = this.state.bubbleChartThis.chartInstance;
        const datas =this.props.data.datasets.filter(item => {
            if(item.type == 'scatter' && item.lineTension != 0) {
                return item;
            }
        });
        for(const [key, value] of Object.entries(datas)) {
            value._meta[0].hidden = this.checkToggle(value._meta[0]);
        }
        chartThis.update();
    }

    hideLineEndPoint = () => {
        var chartThis = this.state.bubbleChartThis.chartInstance;
        const datas =this.props.data.datasets.filter(item => {
            if(item.type == 'scatter' && item.lineTension != 0) {
                return item;
            }
        });
        for(const [key, value] of Object.entries(datas)) {
            if(key == 0 || key == datas.length - 1) {
                value._meta[0].hidden = this.checkToggle(value._meta[0]);
            }
        }
        chartThis.update();
    }

    hideLineMiddle = () => {
        var chartThis = this.state.bubbleChartThis.chartInstance;
        const datas =this.props.data.datasets.filter(item => {
            if(item.type == 'scatter' && item.lineTension != 0) {
                return item;
            }
        });
        for(const [key, value] of Object.entries(datas)) {
            if(key != 0 && key != datas.length - 1) {
                value._meta[0].hidden = this.checkToggle(value._meta[0]);
            }
        }
        chartThis.update();
    }

    checkToggle = (toggleItem) => {
        return toggleItem.hidden? 
            false: true;
    }

    constructor(props) {
        super(props);
        const bubbleChart = props.root.chart.getBubbleChartByKey(props.storeKey);
        const {
            chartFontSize, chartTitle, xAxesName, yAxesName
            , minXAxes, maxXAxes, minYAxes, maxYAxes
            ,...bubblechart} 
        = bubbleChart
        this.state ={
            plugins: [
                {
                    afterDraw: (chartInstance, easing) => {
                        // 현재 차트 컨텍스트 획득
                        const ctx = chartInstance.chart.ctx;
                        const chartArea = chartInstance.chartArea;
            
                        var textInfo = {};
                        textInfo.fontPositionX = chartArea.left;
                        textInfo.fontPositionY = chartArea.top;
                        textInfo.fontPixel = chartFontSize; 
                        textInfo.fontStyle = "Georgia";
                        textInfo.fontColor = "black";
                        textInfo.fillText = "1번째 줄 채우기";
                        fillTextAddLine(ctx, textInfo);
                        
                        doCalcNextLine(textInfo);
                        textInfo.fillText = "2번째 줄 채우기";            
                        fillTextAddLine(ctx, textInfo);
                        this.setImage(chartInstance.toBase64Image());
                        this.props.doCollectChartImage(chartInstance.toBase64Image(), this.props.chartTitle);
                    }
                }
            ],
            options: {
                title: {
                    display: false,
                    text: chartTitle,
                    fontSize: 20
                },
                legend: {
                    labels: {
                        filter: function(item, chart) {
                            const checkTarget = chart.datasets[item.datasetIndex];
                            // return checkTarget.type == 'scatter' && checkTarget.lineTension != 0 ;
                            return false;
                        }
                    }
                }, // 그래프 위 데이터 구분음각
                responsive: true,
                maintainAspectRatio: false,
                tooltips : {
                    callbacks: {
                        label: (tooltipItem, data) =>{
                            var labelString = [];
                            labelString.push(
                                xAxesName +  " : ",
                                tooltipItem.xLabel,
                                ", ",
                                yAxesName + " : ",
                                tooltipItem.yLabel
                            );
                            return labelString.join("");
                        }
                    } // 마우스 오버에 대한 텍스트 재정의
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: xAxesName
                        },
                        display: true,
                        afterTickToLabelConversion: (scale) => {
                            var ticks = scale.ticks;
                            for(var key in ticks) {
                                if(key%2 != 0) {
                                    ticks[key] = '';
                                }
                            }
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: yAxesName
                        },
                        display: true,
                        afterTickToLabelConversion: (scale) => {
                            var ticks = scale.ticks;
                            for(var key in ticks) {
                                if(key%2 != 0) {
                                    ticks[key] = '';
                                }
                            }
                        }
                    }] 
                },
                onClick: (event, activeElements) => {
                    if(activeElements.length > 0) {
                        const firstTarget = activeElements[0];
                        const datasetLabel = firstTarget._chart.config.data.datasets[firstTarget._datasetIndex].label;
                        const data = firstTarget._chart.config.data.datasets[firstTarget._datasetIndex].data[firstTarget._index];
                        var alertText = [];
                        alertText.push(datasetLabel);
                        alertText.push("-> ");
                        alertText.push(xAxesName + ": ");
                        alertText.push(data.x);
                        alertText.push(", ");
                        alertText.push(yAxesName + ": ");
                        alertText.push(data.y);
            
                        alert(alertText.join(""));
                    }
                }
            },
            bubbleChart : props.root.chart.getBubbleChartByKey(props.storeKey)
        }

        if(minXAxes) {
            this.state.options.scales.xAxes[0].ticks = {
                min: minXAxes, //넘어온값이 String이므로 강제로 numberic으로 변경,
            }
        }
        if(maxXAxes) {
            this.state.options.scales.xAxes[0].ticks = {
                max: maxXAxes //넘어온값이 String이므로 강제로 numberic으로 변경
            }
        }

        if(minYAxes) {
            this.state.options.scales.yAxes[0].ticks = {
                min: minYAxes, //넘어온값이 String이므로 강제로 numberic으로 변경
            }
        }
        if(maxYAxes) {
            this.state.options.scales.yAxes[0].ticks = {
                max: maxYAxes //넘어온값이 String이므로 강제로 numberic으로 변경
            }
        }
    }
    
    componentDidMount() {
        
    }
    

    

    render() {
        const {chartWidth, chartHeight, ...bubbleChart} = this.state.bubbleChart;
        return (
            <div>
                <button onClick={this.exportImage}>버블차트 저장</button>
                <button onClick={this.openModal}>모달오픈</button>
                <div style={{
                    width:chartWidth + "px"
                    ,height:chartHeight + "px"
                }}>
                    <Bubble 
                        ref={ref => {
                            this.state.bubbleChartThis = ref;
                        }}
                        data={this.state.bubbleChart}
                        options={this.state.options} plugins={this.state.plugins} />
                    <Modal 
                        openFlag={this.state.isModalOpen}
                        close={this.closeModal} 
                        bubbleChartImage={this.state.bubbleChartImage} 
                        setImage={this.setImage} 
                    />
                </div>
                <button onClick={this.hideLineAll}>모든선토글</button>
                <button onClick={this.hideLineEndPoint}>끝선토글</button>
                <button onClick={this.hideLineMiddle}>중간선토글</button>
        </div>
        );
    }
}

export default CanvasBaseBubbleChart