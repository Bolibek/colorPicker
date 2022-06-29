import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";
import { useNavigate } from "react-router-dom";

function ColorBox({ background, name, moreUrl, showingFullPalette, classes }) {
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);
	const handleCopyState = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};
	const goToPalette = () => {
		navigate(moreUrl);
	};
	return (
		<CopyToClipboard text={background} onCopy={handleCopyState}>
			<div
				style={{
					backgroundColor: background,
					height: showingFullPalette ? "25" : "50%",
				}}
				className={classes.ColorBox}
			>
				<div
					style={{ background }}
					className={classNames(classes.copyOverlay, {
						[classes.showOverlay]: copied,
					})}
				/>

				<div
					className={classNames(classes.copyMessage, {
						[classes.showMessage]: copied,
					})}
				>
					<h1>copied!</h1>
					<p className={classes.copyText}>{background}</p>
				</div>
				<div>
					<div className={classes.boxContent}>
						<span className={classes.colorName}>{name}</span>
					</div>
					<button className={classes.copyButton}>Copy</button>
				</div>
				{showingFullPalette && (
					<span
						onClick={(e) => (e.stopPropagation(), goToPalette())}
						className={classes.seeMore}
					>
						MORE
					</span>
				)}
			</div>
		</CopyToClipboard>
	);
}

export default withStyles(styles)(ColorBox);
