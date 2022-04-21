import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkModeState, goalPeriod } from "../Atom";

function TimelineChart({doingGoals}) {
  const isDark = useRecoilValue(darkModeState);

  console.log(doingGoals);
  
  const [state, setState] = useState({
    series: [
      {
        data: [
          {
            x: "인강 듣기",
            y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()],
          },
          {
            x: "청소하기",
            y: [new Date("2019-03-08").getTime(), new Date("2019-03-12").getTime()],
          },
          {
            x: "악기 연습",
            y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()],
          },
        ],
      },
    ],
    options: {
      theme: {
        mode: isDark ? "dark" : "light",
      },
      chart: {
        height: 350,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
        background: "transparent",
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
