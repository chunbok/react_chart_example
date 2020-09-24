import React from 'react';
import BoxPlotChart from './boxplot'

class WrappingBoxPlotChart extends React.Component {

    render() {
        return (
        <div>
            <BoxPlotChart 
                chartTitle={this.props.chartTitle}
                chartWidth={this.props.chartWidth} chartHeight={this.props.chartHeight}
                // minXAxes="0" maxXAxes="200"
                // minYAxes="0"  // maxYAxes="2000"
                xAxesName={this.props.xAxesName} yAxesName={this.props.yAxesName}
                data={this.props.data}
            />
        </div>
        );
    }
}

export default WrappingBoxPlotChart