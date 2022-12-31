import * as d3 from "d3";

let zoom = null;

export const setSvg = (props) => {
  const { svgCurElement } = props;
  const { width, height } = props.mapOption;

  d3.select(svgCurElement)
    .attr("width", width + "px")
    .attr("height", height + "px");
};

export const setZoomEvent = (props, callback) => {
  const { gCurElement } = props;
  //scaleExtend : k0~k1 허용 배율 인수
  zoom = d3
    .zoom()
    // .scaleExtent([1, 8])
    .on("zoom", (e) => {
      const { transform } = e;
      d3.select(gCurElement)
        .attr("transform", transform)
        .attr("stroke-width", 1 / transform.k);
    })
    /* 
      zoom event-end에 대해 wheel, click event 모두 다 발생한다.
      1) svg클릭 시 resetZoom + basicZoom
      2) path클릭 시 resetZoom + basicZoom + clickZoom
      3) 다시 svg클릭 시 resetZoom + basicZoom
      위 이벤트 버블링문제가 잔존함.
    */
    .on("end", (e) => {
      callback(e.transform.k);
    });
  return zoom;
};

export const setSvgResetEvent = (props) => {
  const { svgCurElement, gCurElement } = props.curElements;
  const { width, height } = props.mapOption;

  d3.select(svgCurElement).on("click", () => {
    d3.select(gCurElement).selectChildren().style("fill", null);
    d3.select(svgCurElement)
      .transition()
      .duration(1000)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3
          .zoomTransform(d3.select(svgCurElement).node())
          .invert([width / 2, height / 2])
      );
  });
};

export const setPathZoomEvent = (props) => (e) => {
  const { svgCurElement, gCurElement } = props.curElements;
  const { width, height } = props.mapOption;
  const { path, geo } = props;
  const [[x0, y0], [x1, y1]] = path.bounds(geo);

  d3.select(gCurElement).selectChildren().style("fill", null);
  d3.select(e.target).transition().style("fill", "red");
  d3.select(svgCurElement)
    .transition()
    .duration(1000)
    .call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(1 / Math.max((x1 - x0) / width, (y1 - y0) / height))
        .translate(-(x1 + x0) / 2, -(y1 + y0) / 2),
      d3.pointer(e, d3.select(svgCurElement).node())
    );
};
