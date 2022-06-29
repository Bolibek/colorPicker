import {  useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";
import { useDispatch, useSelector } from "react-redux";
import {
	handleNewColorName,
	updateCurrentColor,
	addNewColor,
} from "../app/actions";

function ColorPickerForm(props) {
	const ref = useRef("form");
	const { classes } = props;
	const { currentColor, newColorName, colors } = useSelector((state) => state);
	const maxColors = 20;
	const dispatch = useDispatch();
	useEffect(() => {
		ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
			return colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			);
		});
		ValidatorForm.addValidationRule("isColorUnique", () => {
			return colors.every(({ color }) => color !== currentColor);
		});
	});
	const handleCurrentColor = (newColor) => {
		dispatch(updateCurrentColor(newColor.hex));
	};
	const handleChange = (event) => {
		dispatch(handleNewColorName(event.target.value));
	};
	const handleSubmit = () => {
		const newColor = {
			color: currentColor,
			name: newColorName,
		};
		dispatch(addNewColor(newColor));
		dispatch(handleNewColorName(""));
	};
	const paletteIsFull = colors.length >= maxColors;
	return (
		<div>
			<ChromePicker
				color={currentColor}
				onChangeComplete={handleCurrentColor}
				className={classes.picker}
			/>
			<ValidatorForm onSubmit={handleSubmit} ref={ref} instantValidate={false}>
				<TextValidator
					value={newColorName}
					className={classes.colorNameInput}
					placeholder="Color Name"
					name="newColorName"
					variant="filled"
					margin="normal"
					onChange={handleChange}
					validators={["required", "isColorNameUnique", "isColorUnique"]}
					errorMessages={[
						"Enter a color name",
						"Color name must be unique",
						"Color already used!",
					]}
				/>
				<Button
					variant="contained"
					type="submit"
					color="primary"
					disabled={paletteIsFull}
					className={classes.addColor}
					style={{
						backgroundColor: paletteIsFull ? "grey" : currentColor,
					}}
				>
					{paletteIsFull ? "Palette Full" : "Add Color"}
				</Button>
			</ValidatorForm>
		</div>
	);
}

export default withStyles(styles)(ColorPickerForm);
