import { configureStore } from "@reduxjs/toolkit";
import stringMiddleware from "../middleware/stringMiddleware";
import reducer from "./reducer";

const store = configureStore({
	reducer: reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV === "production" ? false : true,
});

export default store;