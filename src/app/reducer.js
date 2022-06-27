import seedColors from "../components/seedColors";
window.localStorage.setItem("palettes", JSON.stringify(seedColors));
const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

const initialState = {
	palettes: savedPalettes,
	colors: seedColors[0].colors,
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
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SAVE_PALETTE":
			return {
				...state,
				palettes: [...state.palettes, action.payload],
			};
		// case "ADD_PALETTE":
		//   return [...state, action.payload];
		// case "REMOVE_PALETTE":
		//   return state.filter((palette) => palette.id !== action.payload);
		// case "ADD_COLOR":
		//   return state.map((palette) => {
		//     if (palette.id === action.payload.id) {
		//       return {
		//         ...palette,
		//         colors: [...palette.colors, action.payload.color],
		//       };
		//     }
		//     return palette;
		//   });
		// case "REMOVE_COLOR":
		//   return state.map((palette) => {
		//     if (palette.id === action.payload.id) {
		//       return {
		//         ...palette,
		//         colors: palette.colors.filter(
		//           (color) => color.id !== action.payload.colorId
		//         ),
		//       };
		//     }
		//     return palette;
		//   });
		default:
			return state;
	}
};

export default reducer;
