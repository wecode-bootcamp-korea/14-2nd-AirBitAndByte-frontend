import React from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends React.Component {
  render() {
    const { data, highlight } = this.props;

    var counts = {};
    for (let i = 0; i < data.length; i++)
      counts[Math.round(data[i] / 10000) * 10000] = counts[Math.round(data[i] / 10000) * 10000] + 1 || 1;

    const barDataValues = [];
    for (let i in counts) {
      barDataValues.push(counts[i] || 0);
    }

    const barData = {
      labels: Object.keys(counts).map((key) => key),
      datasets: [
        {
          backgroundColor: Object.keys(counts).map((val) =>
            val >= highlight[0] && val <= highlight[1] ? 'rgba(135, 206, 235, 1)' : 'rgba(255, 99, 132, 0.2)'
          ),
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          data: [...barDataValues],
        },
      ],
    };

    const options = {
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              min: 0,
            },
          },
        ],
      },
    };
    return <Bar data={barData} options={options} />;
  }
}

export default BarChart;
