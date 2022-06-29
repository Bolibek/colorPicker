import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import Page from "./components/Page";
import NewPaletteForm from "./components/NewPaletteForm";

export default function App() {
	const NewPaletteFormWrapper = () => {
		return (
			<Page>
				<NewPaletteForm />
			</Page>
		);
	};

	const SingleColorPaletteWrapper = () => {
		return (
			<Page>
				<SingleColorPalette />
			</Page>
		);
	};

	const PaletteListWrapper = () => {
		return (
			<Page>
				<PaletteList />
			</Page>
		);
	};

	const PaletteWrapper = () => {
		return (
			<Page>
				<Palette />
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
