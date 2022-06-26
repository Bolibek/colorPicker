import React, { Component } from "react";
import { Route, Routes, useParams, useLocation, matchRoutes } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import Page from "./components/Page";
import NewPaletteForm from "./components/NewPaletteForm";
import seedColors from "./components/seedColors";
import { generatePalette } from "./components/colorHelpers";
import { v4} from 'uuid';

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
		this.state = { palettes: savedPalettes || seedColors };
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}
	findPalette(id) {
		return this.state.palettes.find(function (palette) {
			return palette.id === id;
		});
	}
	deletePalette(id) {
		this.setState(
			(st) => ({
				palettes: st.palettes.filter((palette) => palette.id !== id),
			}),
			this.syncLocalStorage
		);
	}
	savePalette(newPalette) {
		this.setState(
			{ palettes: [...this.state.palettes, newPalette] },
			this.syncLocalStorage
		);
	}
	syncLocalStorage() {
		//save palettes to local storage
		window.localStorage.setItem(
			"palettes",
			JSON.stringify(this.state.palettes)
		);
	}
	render() {
		const NewPaletteFormWrapper = (props) => {
			return (
				<Page>
					<NewPaletteForm
						{...{
							...props,
							palettes: this.state.palettes,
							savePalette: this.savePalette,
						}}
					/>
				</Page>
			);
		};
		const SingleColorPaletteWrapper = (props) => {
			const params = useParams();
			const palette = generatePalette(this.findPalette(params.paletteId));
			console.log(palette);
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
							palettes: this.state.palettes,
							deletePalette: this.deletePalette,
						}}
					/>
				</Page>
			);
		};

		const PaletteWrapper = (props) => {
			const params = useParams();
			const palette = generatePalette(this.findPalette(params.id));
			return (
				<Page >
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
							<Route
								exact
								path="/"
								element={<PaletteListWrapper />}
							/>
							<Route
								exact
								path="/palette/:id"
								element={<PaletteWrapper />}
							/>
						</Routes>
					</CSSTransition>
				</TransitionGroup>
			);
		};
		return (
			<RoutesWrapper />
		);
	}
}

export default App;
