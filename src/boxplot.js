import React from 'react';
import 'chart.js';
import 'chartjs-chart-box-and-violin-plot';

class BoxPlotChart extends React.Component {

    remakeData = (data) => {
        var returnObject = {};
        // 오브젝트와 배열일경우만 재탐색한다.
        // String은 객체가 아닌 값으로 판단하기 필터 조건절에 추가한다.
        if(Object.entries(data).length > 0 && data.constructor != String) {
            for(const [key, value] of Object.entries(data)) {
                if(value.constructor == Array) {
                    var tempArray = [];
                    value.forEach(item => {
                        if(key == 'outliers') {
                            tempArray.push(item.value);
                        }else {
                            tempArray.push(this.remakeData(item));
                        }
                    });
                    returnObject[key] = tempArray;
                }else {
                    returnObject[key] = this.remakeData(value);
                }
            }
        }else {
            return data;
        }
        return returnObject;
    }

    constructor(props) {
        super();
        this.chartCanvas = null;

        this.state ={
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
                        boxplotLabel: (tooltipItem, data, stats, hoveredOutlierIndex) =>{
                            this.setState({
                                outlinerHover: {
                                    dataSetIndex: tooltipItem.datasetIndex,
                                    dataIndex: tooltipItem.index,
                                    outlierIndex: hoveredOutlierIndex
                                }
                            })
                            var labelString = [];
                            labelString.push(this.state.outlinerHover.dataSetIndex);
                            labelString.push(this.state.outlinerHover.dataIndex);
                            labelString.push(this.state.outlinerHover.outlierIndex);
                            return labelString.join(",");
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
                    // 클릭시 마우스오버로 인한 데이터 갱신이 되었는지 확인한다.
                    if(
                        this.state.outlinerHover.dataSetIndex < 0 ||
                        this.state.outlinerHover.dataIndex < 0 ||
                        this.state.outlinerHover.outlierIndex < 0
                    ){
                        return alert("마우스오버된 아웃라이어 없음");
                    }
                    // 오브젝트 클릭시(배경 클릭 거부)
                    if(activeElements.length > 0) {
                        const dataset = this.props.data.datasets[this.state.outlinerHover.dataSetIndex]
                        const data = dataset.data[this.state.outlinerHover.dataIndex];
                        const dataOutlier = data.outliers[this.state.outlinerHover.outlierIndex];
                        var alertText = [];
                        alertText.push(
                            "min : ",
                            data.min,
                            ", q1 : ",
                            data.q1,
                            ", median : ",
                            data.median,
                            ", q3 : ",
                            data.q3,
                            ", max : ",
                            data.max,
                            ", outlier value : ",
                            dataOutlier.value,
                            ", outlier tempKey: ",
                            dataOutlier.params.tempKey
                        );
            
                        alert(alertText.join(""));
                    }
                }
            },
            outlinerHover: {
                dataSetIndex: 0,
                dataIndex: 0,
                outlierIndex: 0
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

    componentDidMount() {
        const ctx = this.chartCanvas.getContext("2d");

        var myBar = new Chart(ctx, {
            type: 'boxplot',
            data: this.remakeData(this.props.data),
            options: this.state.options
        });
      }

    render() {
        return (
        <div style={{
            width:this.props.chartWidth + "px"
            ,height:this.props.chartHeight + "px"
        }}>
            <canvas ref={ref => {
                this.chartCanvas = ref;
            }}></canvas>
        </div>
        );
    }
}

export default BoxPlotChart