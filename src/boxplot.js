import React from 'react';
import 'chart.js';
import 'chartjs-chart-box-and-violin-plot';

class BoxPlotChart extends React.Component {

    constructor(props) {
        super();
        this.chartCanvas = null;

        this.state ={
            options: {
                legend: {
                    display: false,
                }, // 그래프 위 데이터 구분음각
                responsive: true,
                maintainAspectRatio: false,
                tooltips : {
                    callbacks: {
                        label: (tooltipItem, data) =>{
                            var labelString = [];
                            const Itemdata = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            const titleData = Itemdata.__stats? Itemdata.__stats : Itemdata;
                            labelString.push(
                                this.props.xAxesName +  " : ",
                                tooltipItem.xLabel,
                                ", min : ",
                                titleData.min,
                                ", q1 : ",
                                titleData.q1,
                                ", median : ",
                                titleData.median,
                                ", q3 : ",
                                titleData.q3,
                                ", max : ",
                                titleData.max
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
                        display: true,
                        ticks: {
                            min: props.minXAxes/1, //넘어온값이 String이므로 강제로 numberic으로 변경,
                            max: props.maxXAxes/1 //넘어온값이 String이므로 강제로 numberic으로 변경
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: props.yAxesName
                        },
                        display: true,
                        ticks: {
                            min: props.minYAxes/1, //넘어온값이 String이므로 강제로 numberic으로 변경
                            max: props.maxYAxes/1 //넘어온값이 String이므로 강제로 numberic으로 변경
                        }
                    }] 
                },
                onClick: (event, activeElements) => {
                    if(activeElements.length > 0) {
                        const firstTarget = activeElements[0];
                        const datasetLabel = firstTarget._chart.config.data.datasets[firstTarget._datasetIndex].label;
                        const data = firstTarget._chart.config.data.datasets[firstTarget._datasetIndex].data[firstTarget._index];
                        const titleData = data.__stats? data.__stats : data;
                        var alertText = [];
                        alertText.push(
                            ", min : ",
                            titleData.min,
                            ", q1 : ",
                            titleData.q1,
                            ", median : ",
                            titleData.median,
                            ", q3 : ",
                            titleData.q3,
                            ", max : ",
                            titleData.max
                        );
            
                        alert(alertText.join(""));
                    }
                }
            }
        }
    }

    componentDidMount() {
        const ctx = this.chartCanvas.getContext("2d");

        var myBar = new Chart(ctx, {
            type: 'boxplot',
            data: this.props.data,
            options: this.state.options
        });
      }

    render() {
        return (
        <div style={{
            width:this.props.chartWidth + "px"
            ,height:this.props.chartHeight + "px"
        }}>
            <h2>{this.props.chartTitle}</h2>
            <canvas ref={ref => {
                this.chartCanvas = ref;
            }}></canvas>
        </div>
        );
    }
}

export default BoxPlotChart