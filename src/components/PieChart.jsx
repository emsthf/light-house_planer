import React from "react";
import ApexChart from "react-apexcharts";

function PieChart() {
  const state = {
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  };

  return (
    <div>
      <ApexChart
        type="donut"
        series={[14, 6]} // 배열의 첫번째 인덱스는 성공 목표 갯수, 두번째 인덱스는 실패 목표 갯수를 입력하면 자동으로 연산해 준다
        chartOptions={{
          labels: ["Apple", "Mango"],
        }}
        options={{
          // theme: {
          //   mode: isDark ? "dark" : "light",
          // },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  // name: {
                  //   show:true,
                  // },
                  // value: {
                  //   ...
                  // }
                },
              },
              customScale: 0.8,
            },
          },
          chart: {
            height: 350,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        }}
      />
    </div>
  );
}

export default PieChart;
