import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

function SingleColorPalette({ palette, classes, colorId }) {
	const { colors, paletteName, id, emoji } = palette;
	const [format, setFormat] = useState("hex");
	const [shades, setShades] = useState([]);

	useEffect(() => {
		let shadesArray = [];
    let allColors = colors;
		for (let key in allColors) {
      shadesArray = shadesArray.concat(colors[key].filter((color) => color.id === colorId));
		}
		setShades(shadesArray.slice(1));
	})
  const changeFormat = (val) => setFormat(val);
  const colorBoxes = shades.map((color) => (
			<ColorBox
				key={color.name}
				name={color.name}
				background={color[format]}
				showingFullPalette={false}
			/>
		));
	return (
		<div className={classes.Palette}>
			<Navbar handleChange={changeFormat} />
			<div className={classes.colors}>
				{colorBoxes}
				<div className={classes.goBack}>
					<Link to={`/palette/${id}`}>GO BACK</Link>
				</div>
			</div>
			<PaletteFooter
				className={classes.footer}
				paletteName={paletteName}
				emoji={emoji}
			/>
		</div>
	);
}

export default withStyles(styles)(SingleColorPalette);
