import React, { useState } from "react";
import ApexChart from "react-apexcharts";

function HeatMapChart() {
  const xLabels = new Array(7).fill(0).map((_, i) => `${i + 1}`); // x축. 몇주 동안 체크하는지
  const yLabels = new Array(5).fill(0).map((_, i) => `${i + 1}`); // y축. 일주일에 몇번 체크할건지
  const testData = [
    { name: 1, data: [10, 100, 100, 10, 100, 10, 10] },
    { name: 2, data: [100, 100, 100, 10, 100, 10, 10] },
    { name: 3, data: [10, 100, 10, 10, 100, 10, 10] },
    { name: 3, data: [10, 100, 100, 10, 10, 100, 10] },
    { name: 4, data: [10, 10, 10, 10, 100, 10, 100] },
  ];

  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: xLabels,
      },
    },
    series: [
      // testData.map((item) => ({
      //   name: `${item[item.name - 1].name}`,
      //   data: item[item.name - 1].data,
      // })),

      {
        name: "1",
        data: [10, 100, 100, 10, 100, 10, 10],
      },
      {
        name: "2",
        data: [100, 100, 100, 10, 100, 10, 10],
      },
      {
        name: "3",
        data: [10, 100, 10, 10, 100, 10, 10],
      },
      {
        name: "4",
        data: [10, 10, 10, 10, 100, 10, 100],
      },
    ],
  });

  return (
    <div>
      <ApexChart
        options={state.options}
        series={state.series}
        type="heatmap"
        width="500"
      />
    </div>
  );
}

export default HeatMapChart;
