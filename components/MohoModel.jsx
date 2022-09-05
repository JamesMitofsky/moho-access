import Spline from "@splinetool/react-spline";
import { useState, useRef } from "react";
import { Box } from "@mui/material";
import Router from "next/router";
import Loading from "../components/Loading";

export default function MohoModel() {
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState({
    opacity: 0,
    transition: "all ease 4s",
  });

  function onLoad(spline) {
    setStyles((prev) => ({
      ...prev,
      opacity: 1,
      transition: "opacity ease 1s",
    }));
    setLoaded(true);
  }
  return (
    <Box sx={{ flex: 1 }} style={styles}>
      {/* {!loaded && <Loading loaded={loaded} />} */}
      <Spline
        onMouseDown={onMouseDown}
        onLoad={onLoad}
        scene="https://prod.spline.design/iF8skT1diJd5tAsE/scene.splinecode"
      />
    </Box>
  );
}
