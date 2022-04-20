import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useRecoilState, useRecoilValue } from "recoil";
import { darkModeState } from "../Atom";
import styled from 'styled-components';

const Charts = styled.div`
width: 500px;
box-sizing: border-box;
padding: 10px 20px;
`;

function BarChart({doingGoals}) {

    const isDark = useRecoilValue(darkModeState);

    const [series, setSeries] = useState(
        [{
            data: [{
              x: '',
              y: 0
            }, {
              x: '',
              y: 0
            }, {
              x: '',
              y: 0
            }]
          }]
    );

    const [options, setOptions] = useState({
        chart : {
            toolbar: {
                show: false,
            },
            background: "transparent",
            // stacked: true,
            // stackType: "100%"
        },
        plotOptions: {
            bar: {
              horizontal: true
            }
        }
    });

    console.log(doingGoals);

    useEffect(() => {
        if(doingGoals.length > 0) {
            setSeries([
                {
                    data: [{
                      x: doingGoals[0].goalTitle,
                      y: (doingGoals[0].count / doingGoals[0].totalCount) * 100
                    }]
                  }
            ]);
        }
    }, []);

    return (
        <Charts>
            <ApexCharts options={options} series={series} type='bar' width={420} />
        </Charts>
     );
}

export default BarChart;