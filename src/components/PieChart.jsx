import axios from "axios";
import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { darkModeState, userState } from "../Atom";

function PieChart() {
  const isDark = useRecoilValue(darkModeState);
  const state = {
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  };
  const user = useRecoilValue(userState);
  const [success, setSuccess] = useState(0);
  const [fail, setFail] = useState(0);

  useEffect(() => {
    // 성공한 목표 갯수
    axios.get(`http://localhost:8080/api/goal/result/1/1/${user.id}?result=true`)
    .then(Response => {
      setSuccess(Response.data);
    }).catch(Error => console.log(Error));

    // 실패한 목표 갯수
    axios.get(`http://localhost:8080/api/goal/result/1/0/${user.id}?result=false`)
    .then(Response => {
      setFail(Response.data);
    }).catch(Error => console.log(Error));
  }, []);

  return (
    <div>
      <ApexChart
        type="donut"
        width={400}
        height={400}
        series={[success, fail]} // 배열의 첫번째 인덱스는 성공 목표 갯수, 두번째 인덱스는 실패 목표 갯수를 입력하면 자동으로 연산해 준다
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },
          labels: ["Success", "Fail"],
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: "22px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    color: undefined,
                    offsetY: -10,
                    formatter: function (val) {
                      return val;
                    },
                  },
                  value: {
                    show: true,
                    fontSize: "16px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    color: undefined,
                    offsetY: 16,
                    formatter: function (val) {
                      return val;
                    },
                  },
                  total: {
                    show: false,
                    showAlways: false,
                    label: "Total",
                    fontSize: "22px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    color: "#373d3f",
                    formatter: function (w) {
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0);
                    },
                  },
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
