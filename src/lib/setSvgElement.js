import * as d3 from "d3";
export const setSvgElement = (props) => {
  const { currentElement } = props;
  const { width, height } = props.mapOption;

  if (width && height) {
    var svg = d3
      .select(currentElement)
      .attr("width", width + "px")
      .attr("height", height + "px");
  }
};
