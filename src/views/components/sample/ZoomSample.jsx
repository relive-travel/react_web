import * as d3 from "d3";
import * as topojson from "topojson";
import { useRef } from "react";

import GyeongGIJson from "assets/json/gyeonggi.json";
import JejuJson from "assets/json/jeju.json";
import KoreaJson from "assets/json/korea.json";
import { setProjection } from "lib/setProjection";
import { useEffect } from "react";
import { useState } from "react";

function ZoomSample() {
  const width = 1306;
  const height = 776;

  const svgRef = useRef();
  const gRef = useRef();

  const [region, setRegion] = useState();

  var zoom = null;
  var path = null;

  const zoomed = (e) => {
    console.log(e);
    const { transform } = e;
    d3.select(gRef.current)
      .attr("transform", transform)
      .attr("stroke-width", 1 / transform.k);
  };

  const reset = () => {
    d3.select(gRef.current).selectChildren().transition().style("fill", null);
    d3.select(svgRef.current)
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3
          .zoomTransform(d3.select(svgRef.current).node())
          .invert([width / 2, height / 2])
      );
  };
  const clicked = (d) => (event) => {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    console.log(path.bounds(d));
    event.stopPropagation();
    d3.select(gRef.current).selectChildren().transition().style("fill", null);
    d3.select(event.target).transition().style("fill", "red");
    d3.select(svgRef.current)
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
        d3.pointer(event, d3.select(svgRef.current).node())
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

    d3.select(svgRef.current)
      .attr("width", width + "px")
      .attr("height", height + "px")
      .on("click", reset);

    const regionData = geojson.features.map((geo, index) => {
      return (
        <path key={`path-${index}`} d={path(geo)} onClick={clicked(geo)}></path>
      );
    });
    setRegion(regionData);
    // d3.select(gRef.current)
    //   .attr("fill", "pink")
    //   .attr("cursor", "pointer")
    //   .selectAll("path")
    //   .data(geojson.features)
    //   .join("path")
    //   .on("click", clicked)
    //   .attr("d", path);

    // g.append("path")
    //   .attr("fill", "none")
    //   .attr("stroke", "white")
    //   .attr("stroke-linejoin", "round")
    //   .attr(
    //     "d",
    //     path(
    //       topojson.mesh(KoreaJson, KoreaJson.objects.regions, (a, b) => a !== b)
    //     )
    //   );

    // d3.select(svgRef.current).call(zoom);
    console.log(d3.select(svgRef.current).call(zoom));
  }, []);

  return (
    <>
      <svg ref={svgRef}>
        <g ref={gRef}>{region}</g>
      </svg>
    </>
  );
}

export default ZoomSample;
