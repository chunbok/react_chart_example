import React from 'react';
import {Bubble} from 'react-chartjs-2';
import Modal from '../modal/modal';

const doCalcNextLine = (textInfo) => {
    textInfo.fontPositionY = textInfo.fontPositionY + (textInfo.fontPixel);
}

const fillTextAddLine = (ctx, textInfo) => {
    const fontInfo = textInfo.fontPixel + 'px '+ textInfo.fontStyle;

    ctx.font = fontInfo;
    ctx.fillStyle = textInfo.fontColor;
    ctx.fillText(textInfo.fillText, textInfo.fontPositionX, textInfo.fontPositionY);
}

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
        this.state ={
            plugins: [
                {
                    afterRender: (chartInstance, easing) => {
                        // 현재 차트 컨텍스트 획득
                        const ctx = chartInstance.chart.ctx;
            
                        var textInfo = {};
                        textInfo.fontPositionX = props.chartWidth/7;
                        textInfo.fontPositionY = props.chartHeight/10;
                        textInfo.fontPixel = props.chartFontSize/1; //넘어온값이 String이므로 강제로 numberic으로 변경
                        textInfo.fontStyle = "Georgia";
                        textInfo.fontColor = "black";
                        textInfo.fillText = "1번째 줄 채우기";
                        fillTextAddLine(ctx, textInfo);
                        
                        doCalcNextLine(textInfo);
                        textInfo.fillText = "2번째 줄 채우기";            
                        fillTextAddLine(ctx, textInfo);
                        this.setImage(chartInstance.toBase64Image());
                    }
                }
            ],
            options: {
                title: {
                    display: true,
                    text: props.chartTitle,
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
                                this.props.xAxesName +  " : ",
                                tooltipItem.xLabel,
                                ", ",
                                this.props.yAxesName + " : ",
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
                            labelString: props.xAxesName
                        },
                        display: true
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: props.yAxesName
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
                        alertText.push(props.xAxesName + ": ");
                        alertText.push(data.x);
                        alertText.push(", ");
                        alertText.push(props.yAxesName + ": ");
                        alertText.push(data.y);
            
                        alert(alertText.join(""));
                    }
                }
            }
        }

        if(props.minXAxes) {
            this.state.options.scales.xAxes[0].ticks = {
                min: props.minXAxes/1, //넘어온값이 String이므로 강제로 numberic으로 변경,
            }
        }
        if(props.maxXAxes) {
            this.state.options.scales.xAxes[0].ticks = {
                max: props.maxXAxes/1 //넘어온값이 String이므로 강제로 numberic으로 변경
            }
        }

        if(props.minYAxes) {
            this.state.options.scales.yAxes[0].ticks = {
                min: props.minYAxes/1, //넘어온값이 String이므로 강제로 numberic으로 변경
            }
        }
        if(props.maxYAxes) {
            this.state.options.scales.yAxes[0].ticks = {
                max: props.maxYAxes/1 //넘어온값이 String이므로 강제로 numberic으로 변경
            }
        }
    }
    

    

    render() {
        const {chartWidth, chartHeight, ...prorps} = this.props;
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
                        <Bubble data={this.props.data}
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