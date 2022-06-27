import React, { Component, useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

function Palette ({ palette, classes }) {
  const { colors, paletteName, id, emoji } = palette;
  const [format, setFormat] = useState("hex");
  const [level, setLevel] = useState(500);
  const changeLevel = (val) => setLevel(val);
  const changeFormat = (val) => setFormat(val);
  const colorBoxes = colors[level].map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      moreUrl={`/palette/${id}/${color.id}`}
      background={color[format]}
      showingFullPalette
    />
  ));
  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} changeLevel={changeLevel} level={level} showingAllColors />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(Palette);

