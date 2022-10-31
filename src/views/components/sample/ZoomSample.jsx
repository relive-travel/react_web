import * as d3 from "d3";
import * as topojson from "topojson";
import { useRef } from "react";

import GyeongGIJson from "assets/json/gyeonggi.json";
import JejuJson from "assets/json/jeju.json";
import KoreaJson from "assets/json/korea.json";
import { setProjection } from "lib/setProjection";
import { useEffect } from "react";

function ZoomSample() {
  const width = 1306;
  const height = 776;

  const svgRef = useRef();

  var zoom = null;
  var g = null;
  var states = null;
  var svg = null;
  var path = null;

  const zoomed = (e) => {
    const { transform } = e;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  };

  const reset = () => {
    states.transition().style("fill", null);
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
  };
  const clicked = (event, d) => {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style("fill", null);
    d3.select(event.target).transition().style("fill", "red");
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
  };

  useEffect(() => {
    zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

    const geojson = topojson.feature(KoreaJson, KoreaJson.objects.regions);
    path = d3.geoPath().projection(
      setProjection({
        mapOption: {
          width,
          height,
        },
        geojson,
      })
    );

    svg = d3
      .select(svgRef.current)
      .attr("width", width + "px")
      .attr("height", height + "px")
      .on("click", reset);

    g = svg.append("g");

    states = g
      .append("g")
      .attr("fill", "pink")
      .attr("cursor", "pointer")
      .selectAll("path")
      .data(geojson.features)
      .join("path")
      .on("click", clicked)
      .attr("d", path);

    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr(
        "d",
        path(
          topojson.mesh(KoreaJson, KoreaJson.objects.regions, (a, b) => a !== b)
        )
      );

    svg.call(zoom);
  }, []);

  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
}

export default ZoomSample;
