function MarkerSample() {
  useEffect(() => {
    console.log("drawmap 변경됨");
    if (drawPath != null) {
      const geojson = topojson.feature(mapData, mapData.objects.regions);
      const projection = setProjection({ geojson, mapOption });

      d3.select(gPathRef.current)
        .selectAll("image")
        .data(markerData)
        .join("image")
        .attr(
          "transform",
          (d) =>
            `translate(${projection([d.long, d.lat])[0] - 45 / 2}, ${
              projection([d.long, d.lat])[1] - 20 / 2
            })`
        )
        // .attr("transform", (d) => {
        //   console.log(projection([d.long, d.lat]));
        //   console.log(projection([d.long, d.lat])[0] - 45);
        //   console.log(projection([d.long, d.lat])[1] - 20);
        //   return `translate(${
        //     (projection([d.long, d.lat])[0], projection([d.long, d.lat])[1])
        //   })`;
        // })
        // .attr("x", (d) => projection()[0])
        // .attr("y", (d) => projection([d.long, d.lat])[1])
        .attr("width", 45)
        .attr("height", 20)
        .attr("click", () => {
          console.log("히히");
        })
        .attr(
          "xlink:href",
          "https://relivetravle.s3.ap-northeast-2.amazonaws.com/image/left_rabbit.png"
        );

      d3.select(gPathRef.current)
        .selectAll("circle")
        .data(markerData)
        .join("circle")
        .attr("class", "circle")
        .attr("width", 20)
        .attr("height", 20)
        .attr("cx", (d) => projection([d.long, d.lat])[0])
        .attr("cy", (d) => projection([d.long, d.lat])[1])
        .attr("r", 5);
    }
  }, [drawPath]);
}
