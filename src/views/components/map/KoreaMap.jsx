import * as d3 from "d3";
import * as topojson from "topojson";

import { useEffect, useRef } from "react";

import KoreaSGG from "assets/json/0_korea_sgg.json";
import KoreaUMD from "assets/json/0_korea_umd.json";
import SeoulSGG from "assets/json/1_seoul_sgg.json";
import BusanSGG from "assets/json/2_busan_sgg.json";
import DaeguSGG from "assets/json/3_daegu_sgg.json";
import IncheonSGG from "assets/json/4_incheon_sgg.json";
import GwangjuSGG from "assets/json/5_gwangju_sgg.json";
import DaejeonSGG from "assets/json/6_daejeon_sgg.json";
import UlsanUMD from "assets/json/7_ulsan_umd.json";
import SejongSGG from "assets/json/8_sejong_sgg.json";
import SejongUMD from "assets/json/8_sejong_umd.json";
import GyeonggiSGG from "assets/json/9_gyeongi_sgg.json";
import GangwonSGG from "assets/json/10_gangwon_sgg.json";
import ChungbukSGG from "assets/json/11_chungbuk_sgg.json";
import ChungnamSGG from "assets/json/12_chungnam_sgg.json";
import JeonbukSGG from "assets/json/13_jeonbuk_sgg.json";
import JeonnamSGG from "assets/json/14_jeonnam_sgg.json";
import JejuSGG from "assets/json/17_jeju_sgg.json";
import JejuUMD from "assets/json/17_jeju_umd.json";

import "./KoreaMap.scss";
function KoreaMap(props) {
  var TopoJsonData = JejuUMD;

  var svgRef = useRef(null);

  var width = 700;
  var height = 700;

  useEffect(() => {
    const currentElement = svgRef.current;

    var projection = d3.geoMercator().scale(1).translate([0, 0]);

    const geojson = topojson.feature(
      TopoJsonData,
      TopoJsonData.objects.regions
    );

    const center = d3.geoCentroid(geojson);

    const path = d3.geoPath().projection(projection);

    const bounds = path.bounds(geojson);
    const widthScale = (bounds[1][0] - bounds[0][0]) / width;
    const heightScale = (bounds[1][1] - bounds[0][1]) / height;

    const scale = 1 / Math.max(widthScale, heightScale);

    const xoffset =
      width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 10;
    const yoffset =
      height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 80;
    const offset = [xoffset, yoffset];

    console.log(scale, offset);

    projection.scale(scale).translate(offset);

    var svg = d3
      .select(currentElement)
      .attr("width", width + "px")
      .attr("height", height + "px");

    var states = svg.append("g").attr("id", "states");
    // states
    //   .append("rect")
    //   .attr("class", "background")
    //   .attr("width", width + "px")
    //   .attr("height", height + "px");

    states
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path);

    // d3.json(KoreaGeoJson).then((response) => {
    //   states
    //     .selectAll("path")
    //     .data(response.features)
    //     .enter()
    //     .append("path")
    //     .attr("d", path);
    // });
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default KoreaMap;
