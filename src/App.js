import { Route, Routes, useParams, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import Page from "./components/Page";
import NewPaletteForm from "./components/NewPaletteForm";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelpers";
import { useState } from "react";

export default function App() {
	const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
	const [palettes, setPalettes] = useState(savedPalettes || seedColors);

	const findPalette = (id) => {
		return palettes.find((palette) => palette.id === id);
	};
	const handleDeletePalette = (id) => {
		setPalettes(palettes.filter((palette) => palette.id !== id));
		syncLocalStorage();
	};
	const handleSavePalette = (newPalette) => {
		setPalettes([...palettes, newPalette]);
		syncLocalStorage();
	};
	const syncLocalStorage = () => {
		window.localStorage.setItem("palettes", JSON.stringify(palettes));
	}
	const NewPaletteFormWrapper = (props) => {
		return (
			<Page>
				<NewPaletteForm
					{...{
						...props,
						palettes: palettes,
						savePalette: handleSavePalette,
					}}
				/>
			</Page>
		);
	};

	const SingleColorPaletteWrapper = (props) => {
		const params = useParams();
		const palette = generatePalette(findPalette(params.paletteId));
		return (
			<Page>
				<SingleColorPalette
					{...{
						...props,
						colorId: params.colorId,
						palette: palette,
					}}
				/>
			</Page>
		);
	};

	const PaletteListWrapper = (props) => {
		return (
			<Page>
				<PaletteList
					{...{
						...props,
						palettes: palettes,
						deletePalette: handleDeletePalette,
					}}
				/>
			</Page>
		);
	};

	const PaletteWrapper = (props) => {
		const params = useParams();
		const palette = generatePalette(findPalette(params.id));
		return (
			<Page>
				<Palette
					{...{
						...props,
						palette: palette,
					}}
				/>
			</Page>
		);
	};
	const RoutesWrapper = () => {
		const location = useLocation();
		return (
			<TransitionGroup>
				<CSSTransition key={location.key} classNames="page" timeout={500}>
					<Routes location={location}>
						<Route
							exact
							path="/palette/new"
							element={<NewPaletteFormWrapper />}
						/>
						<Route
							exact
							path="/palette/:paletteId/:colorId"
							element={<SingleColorPaletteWrapper />}
						/>
						<Route exact path="/" element={<PaletteListWrapper />} />
						<Route exact path="/palette/:id" element={<PaletteWrapper />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		);
	};
	return (
		<div>
			<RoutesWrapper />
		</div>
	);
}

