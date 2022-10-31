import * as d3 from "d3";
export const setProjection = (props) => {
  const { width, height } = props.mapOption;

  //메르카토르투사법 객체 초기 세팅
  var projection = d3.geoMercator().scale(1).translate([0, 0]);
  //bounds 설정을 위한 임시 path
  var path = d3.geoPath().projection(projection);
  /* 
    bounds는 평면 경계 상자 반환(geojson 객체에 대해 투영된)
    경계 상자 : [[x0, y0][x1, y1]] 2차원 배열 (0=최소, 1=최대)
    1차원 배열 = ymax, ymin (최소, 최대 경도) - longitude (세로-경도) 
    2차원 배열 = xmax, xmin (최소, 최대 위도) - latitude  (가로-위도)
   */
  const bounds = path.bounds(props.geojson);
  // latitude: xmax(bounds[1][0]) - xmin(bounds[0][0])
  const widthScale = (bounds[1][0] - bounds[0][0]) / width;
  // console.log("latitude:", widthScale, bounds[1][0], bounds[0][0])
  // longitude : ymax(bounds[1][1]) - ymin(bounds[0][1])
  const heightScale = (bounds[1][1] - bounds[0][1]) / height;
  // console.log("longitude:", heightScale, bounds[1][1], bounds[0][1])

  const scale = 1 / Math.max(widthScale, heightScale);

  const xoffset = width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2;
  const yoffset = height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2;
  const offset = [xoffset, yoffset];

  return projection.scale(scale).translate(offset);
};
