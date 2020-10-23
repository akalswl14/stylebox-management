import React, { useReducer } from "react";
import TagMapPresenter from "./TagMapPresenter";
import { useQuery } from "react-apollo-hooks";
import { GET_TAGDATA } from "./TagMapQueries";

export const TagMapContext = React.createContext(null);

const initialState = {
	LocationTagData: [],
	StyleTagData: [],
	ProductClassTagData: [],
	FeatureTagData: [],
	PriceTagData: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_DATA":
			return action.data;
		default:
			return state;
	}
}

export default () => {
	const [tagState, tagDispatch] = useReducer(reducer, initialState);
	const { loading, error, data } = useQuery(GET_TAGDATA);
	return (
		<TagMapContext.Provider value={{ tagState, tagDispatch }}>
			<TagMapPresenter loading={loading} data={data} error={error} />
		</TagMapContext.Provider>
	);
};
