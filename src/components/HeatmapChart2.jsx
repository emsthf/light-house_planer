import React from "react";
import HeatMap from "react-heatmap-grid";
import styled from "styled-components";

const ChartBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`;

function HeatmapChart2() {
  const xLabels = new Array(48).fill(0).map((_, i) => `${i + 1}`); // 몇 주를 생성 할 지 배열에 넣으면 됨
  const xLabelsVisibility = new Array(24)
    .fill(0)
    .map((_, i) => (i % 2 === 0 ? true : false));

  // const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const yLabels = new Array(7).fill(0).map((_, i) => `${i + 1}`); // 한 주에 몇 회를 시행할지 횟수를 넣어면 됨
  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
    );

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
        onClick={(x, y) => alert(`Clicked ${x}, ${y}`)} // heatmap 칸 클릭시 띄우는 윈도우 경고 창
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
          fontSize: "11.5px",
          color: "#444",
        })}
        cellRender={(value) => value && <div>{value}</div>}
      />
    </ChartBox>
  );
}

export default HeatmapChart2;
