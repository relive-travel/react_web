import * as d3 from "d3";
import * as topojson from "topojson";

import { useEffect, useRef } from "react";

import "./MapSample.scss";
function MapSample(props) {
  var TopoJsonData = null;

  var svgRef = useRef(null);

  var width = 700;
  var height = 700;

  useEffect(() => {
    const currentElement = svgRef.current;

    const geojson = topojson.feature(
      TopoJsonData,
      TopoJsonData.objects.regions
    );
    var projection = d3.geoMercator().scale(1).translate([0, 0]);

    const path = d3.geoPath().projection(projection);

    const bounds = path.bounds(geojson);
    const widthScale = (bounds[1][0] - bounds[0][0]) / width;
    const heightScale = (bounds[1][1] - bounds[0][1]) / height;

    const center = d3.geoCentroid(geojson);

    const scale = 1 / Math.max(widthScale, heightScale);

    const xoffset =
      width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 10;
    const yoffset =
      height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 80;
    const offset = [xoffset, yoffset];

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

export default MapSample;
