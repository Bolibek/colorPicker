import React, { Component, useState } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generatePalette } from "./colorHelpers";
import { changeLevel, handleChangeLevel } from "../app/actions";

function Palette({ classes }) {
  const dispatch = useDispatch();
	const params = useParams();
	const {level, format, palettes } = useSelector((state) => state);
	const findPalette = (id) => palettes.find((palette) => palette.id === id);
	const palette = generatePalette(findPalette(params.id));
	const { colors, paletteName, emoji, id } = palette;
  // const [level, setLevel] = useState(500);
  const handleChangeLevel = (val) => dispatch(changeLevel(val));
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
			<Navbar showingAllColors level={level} changeLevel={handleChangeLevel}/>
			<div className={classes.colors}>{colorBoxes}</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji} />
		</div>
	);
}

export default withStyles(styles)(Palette);
