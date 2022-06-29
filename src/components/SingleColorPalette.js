import { useEffect } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { generatePalette } from "./colorHelpers";
import {setShades} from "../app/actions"

function SingleColorPalette({ classes }) {
const {colorId, paletteId} = useParams();
const dispatch = useDispatch();
	const {shades, format, palettes } = useSelector((state) => state);
	const findPalette = (id) => palettes.find((palette) => palette.id === id);
	const palette = generatePalette(findPalette(paletteId));
	const { colors, paletteName, emoji, id } = palette;
	useEffect(() => {
		let shadesArray = [];
    let allColors = colors;
		for (let key in allColors) {
      shadesArray = shadesArray.concat(colors[key].filter((color) => color.id === colorId));
		}
		dispatch(setShades(shadesArray.slice(1)));
	}, [])
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
			<Navbar />
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
