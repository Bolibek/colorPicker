import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { openDialog} from "../app/actions";


function MiniPalette ({id, classes, paletteName, emoji, colors}) {
	const dispatch = useDispatch();
	
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
					onClick={() => dispatch(openDialog(id))}
				/>
				<Link
					to={`/palette/${id}`}
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

export default withStyles(styles)(MiniPalette);
