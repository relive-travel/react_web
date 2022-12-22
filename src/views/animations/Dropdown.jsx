import { useEffect } from "react";
import { useState } from "react";

import "./Dropdown.scss";
function Dropdown(props) {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);
  const [repeat, setRepeat] = useState(null);

  useEffect(() => {
    if (props.visivility) {
      clearTimeout(repeat);
      setRepeat(null);
      setVisibilityAnimation(true);
    } else {
      setRepeat(
        setTimeout(() => {
          setVisibilityAnimation(false);
        }, 300)
      );
    }
  }, [props.visivility]);

  return (
    <article
      className={`dropdown-component ${
        props.visivility ? "dropdown-fade-in" : "dropdown-fade-out"
      }`}
    >
      {visibilityAnimation && props.children}
    </article>
  );
}

export default Dropdown;
