import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TextElements(props) {
  const [drawText, setDrawText] = useState(null);

  const mapRegion = useSelector((state) => state.map.region);
  const mapText = useSelector((state) => state.map.text);

  useEffect(() => {
    if (mapText) {
      const textStyle =
        mapRegion === "korea"
          ? {
              fontSize: "1em",
            }
          : {
              fontSize: "0.75em",
            };
      const textElements = mapText.map((text) => {
        return (
          <text
            key={`text-${text.key}`}
            className="text"
            textAnchor="middle"
            transform={text.translate}
            style={textStyle}
          >
            {text.name}
          </text>
        );
      });
      setDrawText(textElements);
    }
  }, [mapText]);
  return <>{drawText}</>;
}

export default TextElements;
