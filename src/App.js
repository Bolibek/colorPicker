import React, { Component } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelper";

class App extends Component {
	findPalette(id) {
		return seedColors.find(function (palette) {
			return palette.id === id;
		});
	}
	render() {
		const SingleColorPaletteWrapper = (props) => {
			const params = useParams();
			return (
				<SingleColorPalette {...{...props, match: {params}}} />
			);
		};

		// const PaletteListWrapper = (routeProps) => {
		// 	return <PaletteList palettes={seedColors} />;
		// };

		const PaletteWrapper = (props) => {
			const params = useParams();
			return <Palette {...{ ...props, match: { params } }} />;
		};
		return (
			<Routes>
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					element={<SingleColorPaletteWrapper />}
				/>
				<Route exact path="/" element={<PaletteList palettes={seedColors} />} />
				<Route exact path="/palette/:id" element={<PaletteWrapper />} />
			</Routes>
		);
	}
}

export default App;

