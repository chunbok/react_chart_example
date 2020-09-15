import React from 'react';
import {Line} from 'react-chartjs-2';

// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
// var originalDoughnutDraw = Chart.controllers.line.prototype.draw;
// Chart.helpers.extend(Chart.controllers.line.prototype, {
//   draw: function() {
//     originalDoughnutDraw.apply(this, arguments);
    
//     var chart = this.chart;
//     var width = chart.chart.width,
//         height = chart.chart.height,
//         ctx = chart.chart.ctx;

//     var fontSize = (height / 114).toFixed(2);
//     ctx.font = fontSize + "em sans-serif";
//     ctx.fillStyle = "black";
//     ctx.textBaseline = "middle";

//     var text = chart.config.data.text,
//         textX = Math.round((width - ctx.measureText(text).width) / 2),
//         textY = height / 2;

//     ctx.fillText(text, textX, textY);
//   }
// });

const data = {
      labels: [
        "10/04/2018",
        "10/05/2018",
        "10/06/2018",
        "10/07/2018",
        "10/08/2018",
        "10/09/2018",
        "10/10/2018",
        "10/11/2018",
        "10/12/2018",
        "10/13/2018"
      ],
      datasets: [
        {
          label: "Temperature",
          data: [22, 19, 27, 23, 22, 24, 17, 25, 23, 24],
          fill: true,
          borderColor: "#ffebee",
          backgroundColor: "#ffebee"
        }
      ],
      text: "$3,881.38"
};

class ExampleChart extends React.Component {

    render() {
      return (
        <div>
          <h2>aReact Doughnut with Text Example</h2>
          <Line data={data} />
        </div>
      );
    }
};

export default ExampleChart