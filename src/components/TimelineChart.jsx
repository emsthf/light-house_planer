import React, { useState } from "react";
import ApexChart from "react-apexcharts";

function TimelineChart() {
  const [state, setState] = useState({
    series: [
      {
        data: [
          {
            x: "숨 쉬기",
            y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()],
          },
          {
            x: "밥 먹기",
            y: [new Date("2019-03-08").getTime(), new Date("2019-03-12").getTime()],
          },
          {
            x: "걷기",
            y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: "datetime",
      },
    },
  });

  return (
    <div id="chart">
      <ApexChart
        options={state.options}
        series={state.series}
        type="rangeBar"
        height={250}
        width={500}
      />
    </div>
  );
}

export default TimelineChart;
