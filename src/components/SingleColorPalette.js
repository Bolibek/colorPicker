import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import { generatePalette } from "./colorHelper";
import seedColors from "./seedColors";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.match.params.paletteId, this.props.match.params.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }
  findPalette(id) {
		return seedColors.find(function (palette) {
			return palette.id === id;
		});
	}
  gatherShades(paletteId, colorToFilterBy) {
    let shades = [];
    const palette = generatePalette(this.findPalette(paletteId));
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  handleShades(palette, colorToFilterBy) {
    this._shades = this.gatherShades(palette, colorToFilterBy);
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const { format } = this.state;
    const palette = generatePalette(this.findPalette(this.props.match.params.paletteId));
    const { paletteName, emoji, id } = palette;
    const { classes } = this.props;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    console.log(colorBoxes, palette);
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
export default withStyles(styles)(SingleColorPalette);