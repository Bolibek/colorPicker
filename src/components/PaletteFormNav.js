import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Button from "@material-ui/core/Button";
import styles from "./styles/PaletteFormNavStyles";
import { useDispatch, useSelector } from "react-redux";
import { showForm, handleDrawerOpen } from "../app/actions";

function PaletteFormNav(props) {
	const dispatch = useDispatch();
	const { classes } = props;
	const {open, formShowing }= useSelector(state => state)
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				color="default"
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar disableGutters={!open}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={() => dispatch(handleDrawerOpen())}
						className={classNames(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<AddToPhotosIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Create A Palette
					</Typography>
				</Toolbar>
				<div className={classes.navBtns}>
					<Link to="/">
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
						>
							Go Back
						</Button>
					</Link>
					<Button
						variant="contained"
						color="primary"
						onClick={() => dispatch(showForm())}
						className={classes.button}
					>
						Save
					</Button>
				</div>
			</AppBar>
			{formShowing && (
				<PaletteMetaForm
				/>
			)}
		</div>
	);
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
