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
class BubbleChart extends React.Component {

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

    constructor(props) {
        super();
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
            
                        var textInfo = {};
                        textInfo.fontPositionX = props.chartWidth/7;
                        textInfo.fontPositionY = props.chartHeight/10;
                        textInfo.fontPixel = chartFontSize; //넘어온값이 String이므로 강제로 numberic으로 변경
                        textInfo.fontStyle = "Georgia";
                        textInfo.fontColor = "black";
                        textInfo.fillText = "1번째 줄 채우기";
                        fillTextAddLine(ctx, textInfo);
                        
                        doCalcNextLine(textInfo);
                        textInfo.fillText = "2번째 줄 채우기";            
                        fillTextAddLine(ctx, textInfo);
                        if(easing == 1) {
                            // easing 1 은 렌더링이 모두 끝난시점을 획득하는것
                            const image = chartInstance.toBase64Image();
                            this.setImage(image);
                            this.props.doCollectChartImage(image, chartTitle);
                        }
                    }
                }
            ],
            options: {
                title: {
                    display: true,
                    text: chartTitle,
                    fontSize: 20
                },
                legend: {
                    display: false,
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
                        display: true
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: yAxesName
                        },
                        display: true
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
                min: minXAxes
            }
        }
        if(maxXAxes) {
            this.state.options.scales.xAxes[0].ticks = {
                max: maxXAxes 
            }
        }

        if(minYAxes) {
            this.state.options.scales.yAxes[0].ticks = {
                min: minYAxes
            }
        }
        if(maxYAxes) {
            this.state.options.scales.yAxes[0].ticks = {
                max: maxYAxes //넘어온값이 String이므로 강제로 numberic으로 변경
            }
        }
    }
    

    

    render() {
        const {chartWidth, chartHeight, ...prorps} = this.state.bubbleChart;
        return (
            <div>
                <button onClick={this.exportImage}>버블차트 저장</button>
                <button onClick={this.openModal}>모달오픈</button>
                <div style={{
                    width:chartWidth + "px"
                    ,height:chartHeight + "px"
                }}>
                    {
                        this.state.bubbleChartImage == null?
                        <Bubble data={this.state.bubbleChart}
                        options={this.state.options} plugins={this.state.plugins} />
                        :
                        <img style={{
                            width:chartWidth + "px"
                            ,height:chartHeight + "px"
                        }} 
                        src={this.state.bubbleChartImage} />
                    }
                    <Modal 
                        openFlag={this.state.isModalOpen}
                        close={this.closeModal} 
                        bubbleChartImage={this.state.bubbleChartImage} 
                        setImage={this.setImage} 
                    />
                </div>
            </div>
        );
    }
}

export default BubbleChart