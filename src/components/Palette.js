import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
import {generatePalette} from "./colorHelper";
import seedColors from "./seedColors";

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500, format: "hex" };
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
	}
	findPalette(id) {
		return seedColors.find(function (palette) {
			return palette.id === id;
		});
	}
	changeLevel(level) {
		this.setState({ level });
	}
	changeFormat(val) {
		this.setState({ format: val });
	}
	render() {
		const { id } = this.props.match.params;
		const palette = generatePalette(this.findPalette(id));
		const { colors, paletteName, emoji } = palette;
		const { classes } = this.props;
		const { level, format } = this.state;
		const colorBoxes = colors[level].map((color) => (
			<ColorBox
				background={color[format]}
				name={color.name}
				key={color.id}
        id={id}
        colorId={color.id}
				showingFullPalette
			/>
		));
		return (
			<div className={classes.Palette}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleChange={this.changeFormat}
					showingAllColors
				/>
				<div className={classes.colors}>{colorBoxes}</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}


export default withStyles(styles)(Palette);