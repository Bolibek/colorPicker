import { useDispatch, useSelector } from "react-redux";
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
import styles from "./styles/NewPaletteFormStyles";
import { addRandomColor, handleDrawerClose, clearColors } from "../app/actions";

function NewPaletteForm(props) {
	const { palettes, colors, open } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { classes } = props;
	const handleAddRandomColor = () => {
		const allColors = palettes.map((palette) => palette.colors).flat();
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
		dispatch(addRandomColor(randomColor));
	};
	const paletteIsFull = colors.length >= 20;
	return (
		<div className={classes.root}>
			<PaletteFormNav />
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
					<IconButton onClick={() => dispatch(handleDrawerClose())}>
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
							onClick={() => dispatch(clearColors())}
							className={classes.button}
						>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							className={classes.button}
							color="primary"
							onClick={handleAddRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm />
				</div>
			</Drawer>
			<main
				className={classNames(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableColorList axis="xy" distance={20} />
			</main>
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
