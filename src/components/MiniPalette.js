import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

class MiniPalette extends PureComponent {
	constructor(props) {
		super(props);
		this.deletePalette = this.deletePalette.bind(this);
	}
	deletePalette(e) {
		this.props.openDialog(this.props.id);
	}
	render() {
		const { classes, paletteName, emoji, colors } = this.props;

		const miniColorBoxes = colors.map((color) => (
			<div
				className={classes.miniColor}
				style={{ backgroundColor: color.color }}
				key={color.name}
			/>
		));
		return (
			<div className={classes.root}>
				<DeleteIcon
					className={classes.deleteIcon}
					style={{ transition: "all 0.3s ease-in-out" }}
					onClick={this.deletePalette}
				/>
				<Link
					to={`/palette/${this.props.id}`}
          className={classes.link}
				>
					<div className={classes.content}>
						<div className={classes.colors}>{miniColorBoxes}</div>
						<h5 className={classes.title}>
							{paletteName} <span className={classes.emoji}>{emoji}</span>
						</h5>
					</div>
				</Link>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
