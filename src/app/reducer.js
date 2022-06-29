import seedColors from "../components/seedColors";
import { arrayMove } from "react-sortable-hoc";
const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
if(savedPalettes.length === 0) {
  window.localStorage.setItem("palettes", JSON.stringify(seedColors));
}

const initialState = {
	palettes: savedPalettes,
	colors: savedPalettes[0].colors,
	open: true,
	formShowing: false,
	stage: "form",
	newPaletteName: "",
	shades: [],
	openDeleteDialog: false,
	deletingId: null,
	format: "hex",
	level: 500,
	copied: false,
	currentColor: "teal",
	newColorName: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SAVE_PALETTE":
			window.localStorage.setItem(
				"palettes",
				JSON.stringify([...state.palettes, action.payload])
			);
			const newSavedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
			return {
				...state,
				palettes: newSavedPalettes,
				stage: "",
			};
		case "HANDLE_DELETE_PALETTE":
      const newPalettes = state.palettes.filter(palette => palette.id !== state.deletingId);
      window.localStorage.setItem("palettes", JSON.stringify(newPalettes));
      const restPalettes = JSON.parse(window.localStorage.getItem("palettes"));
			return {
				...state,
				palettes: restPalettes.lenght > 2? window.localStorage.setItem("palettes", JSON.stringify(seedColors)) : restPalettes,
				openDeleteDialog: false,
				deletingId: null,
			};
		case "HANDLE_DRAWER_OPEN":
			return {
				...state,
				open: true,
			};
		case "HANDLE_DRAWER_CLOSE":
			return {
				...state,
				open: false,
			};
		case "ADD_NEW_COLOR":
			return {
				...state,
				colors: [...state.colors, action.payload],
			};
		case "REMOVE_COLOR":
			return {
				...state,
				colors: state.colors.filter((color) => color.name !== action.payload),
			};
		case "CLEAR_COLORS":
			return {
				...state,
				colors: [],
			};
		case "ADD_RANDOM_COLOR":
			return {
				...state,
				colors: [...state.colors, action.payload],
			};
		case "ON_SORT_END":
			return {
				...state,
				colors: arrayMove(
					state.colors,
					action.payload.oldIndex,
					action.payload.newIndex
				),
			};
		case "SHOW_FORM":
			return {
				...state,
				formShowing: true,
			};
		case "HIDE_FORM":
			return {
				...state,
				formShowing: false,
			};
		case "HANDLE_NEW_PALETTE_NAME":
			return {
				...state,
				newPaletteName: action.payload,
			};
		case "SHOW_EMOJI_PICKER":
			return {
				...state,
				stage: "emoji",
			};
		case "HANDLE_FORMAT_CHANGE":
			return {
				...state,
				format: action.payload,
				open: true,
			};
		case "CLOSE_SNACKBAR":
			return {
				...state,
				open: false,
			};
		case "CHANGE_LEVEL":
			return {
				...state,
				level: action.payload,
			};
		case "UPDATE_CURRENT_COLOR":
			return {
				...state,
				currentColor: action.payload,
			};
		case "HANDLE_NEW_COLOR_NAME":
			return {
				...state,
				newColorName: action.payload,
			};
		case "CHANGE_COPY_STATE":
			return {
				copied: action.payload,
			};
		case "OPEN_DIALOG":
			return {
				...state,
				openDeleteDialog: true,
				deletingId: action.payload,
			};
		case "CLOSE_DIALOG":
			return {
				...state,
				openDeleteDialog: false,
				deletingId: null,
			};
		case "SET_SHADES":
			return {
				...state,
				shades: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
