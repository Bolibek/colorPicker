import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import {savePalette} from "../app/actions";

function NewPaletteForm(props) {
	// const {palettes, colors } = useSelector(state => state)
	const dispatch = useDispatch();
	const {
		classes,
		palettes,
		savePalette,
	} = props;
	const [colors, setColors] = useState(seedColors[0].colors);
	const [open, setOpen] = useState(true);
  const maxColors = 20;
  const navigate = useNavigate();
	const handleDrawerOpen = () => {
		setOpen(true);
	};
  const handleDrawerClose = () => {
    setOpen(false);
  }
	const addNewColor = (newColor) => {
		setColors([...colors, newColor]);
	};
	const removeColor = (colorName) => {
		setColors(colors.filter((color) => color.name !== colorName));
	};
	const clearColors = () => {
		setColors([]);
	};
	const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
		dispatch(savePalette(newPalette));
    navigate("/");
    
	};
	const addRandomColor = () => {
		const allColors = props.palettes.map((palette) => palette.colors).flat();
		let rand;
		let randomColor;
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			rand = Math.floor(Math.random() * allColors.length);
			randomColor = allColors[rand];
			isDuplicateColor = colors.some(
				(color) => color.name === randomColor.name
			);
		}
		setColors([...colors, randomColor]);
	};
	const onSortEnd = ({ oldIndex, newIndex }) => {
		setColors(arrayMove(colors, oldIndex, newIndex));
	};
	const paletteIsFull = colors.length >= maxColors;
	return (
    <div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={handleSubmit}
					handleDrawerOpen={handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant="h5" gutterBottom>
							Design Your Palette
						</Typography>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="secondary"
								onClick={clearColors}
								className={classes.button}
							>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								className={classes.button}
								color="primary"
								onClick={addRandomColor}
								disabled={paletteIsFull}
							>
								Random Color
							</Button>
						</div>
						<ColorPickerForm
							paletteIsFull={paletteIsFull}
							addNewColor={addNewColor}
							colors={colors}
						/>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={removeColor}
						axis="xy"
						onSortEnd={onSortEnd}
						distance={20}
					/>
				</main>
			</div>
  );
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
