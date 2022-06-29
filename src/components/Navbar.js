import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";
import { useDispatch, useSelector } from "react-redux";
import { handleFormatChange, changeLevel, closeSnackbar } from "../app/actions";

function Navbar({ level, classes, changeLevel, showingAllColors }) {
	const { format, open } = useSelector((state) => state);
	const handleChange = (event) => {
		dispatch(handleFormatChange(event.target.value));
	};
	const dispatch = useDispatch();
	return (
		<header className={classes.Navbar}>
			<div className={classes.logo}>
				<Link to="/">reactcolorpicker</Link>
			</div>
			{showingAllColors && (
				<div>
					<span>Level: {level}</span>
					<div className={classes.slider}>
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
			)}
			<div className={classes.selectContainer}>
				<Select value={format} onChange={handleChange}>
					<MenuItem value="hex">HEX - #ffffff</MenuItem>
					<MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
					<MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
				</Select>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				open={open}
				autoHideDuration={3000}
				message={<span id="message-id">Format Changed To {format}</span>}
				ContentProps={{
					"aria-describedby": "message-id",
				}}
				onClose={() => dispatch(closeSnackbar())}
				action={[
					<IconButton
						onClick={() => dispatch(closeSnackbar())}
						color="inherit"
						key="close"
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>,
				]}
			/>
		</header>
	);
}
export default withStyles(styles)(Navbar);
