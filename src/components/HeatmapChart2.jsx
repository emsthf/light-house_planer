import React from "react";
import HeatMap from "react-heatmap-grid";
import styled from "styled-components";

const ChartBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;

function HeatmapChart2() {
  const xLabels = new Array(8).fill(0).map((_, i) => `${i + 1}`); // 몇 주를 생성 할 지 배열에 넣으면 됨
  const xLabelsVisibility = new Array(24)
    .fill(0)
    .map((_, i) => (i % 2 === 0 ? true : false));

  // const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const yLabels = new Array(5).fill(0).map((_, i) => `${i + 1}`); // 한 주에 몇 회를 시행할지 횟수를 넣어면 됨
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
    );

    // const max = 100;
    // const min = 0;

  return (
    <ChartBox style={{ fontSize: "13px" }}>
      <HeatMap
        xLabels={xLabels} // x축 라벨들
        yLabels={yLabels} // y축 라벨들
        xLabelsLocation={"bottom"}
        xLabelsVisibility={xLabelsVisibility}
        xLabelWidth={60} // heatmap의 X축 px 크기
        data={data}
        squares // boolean 값. true면 히트맵이 정사각형
        height={25} // 각 heatmap 칸의 높이
        // onClick={(x, y) => alert(`Clicked ${x}, ${y}`)} // heatmap 칸 클릭시 띄우는 윈도우 경고 창
        cellStyle={(value, min, max, data, x, y) => ({
          // background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
          background: `rgb(0, 151, 230, ${1 - (max - 0) / (max - min)})`,
          border: '1px solid #89d8d3'
        })}
        // cellRender={(value) => value && <div>{value}</div>}
      />
    </ChartBox>
  );
}

export default HeatmapChart2;
