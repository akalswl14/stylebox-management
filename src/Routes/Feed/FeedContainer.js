import React, { useState } from "react";
import FeedPresenter from "./FeedPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { FEED_QUERY, RESET_MUTATION, FEED_MUTATION } from "./FeedQueries";
import { toast } from "react-toastify";

export default () => {
	const { loading, data } = useQuery(FEED_QUERY);
	const [resetShop, { error: resetError }] = useMutation(RESET_MUTATION);
	const [updateFeed, { error: updateError }] = useMutation(FEED_MUTATION);
	const [alreadyGetData, setalreadyGetData] = useState(false);
	const [feedState, setFeedState] = useState({
		TodaysStylesPeriod: "",
		SearchPeriod: "",
		BestRankNum: 1,
		shopConstA: 1,
		shopConstB: 1,
		shopConstC: 1,
		postConstA: 1,
		postConstB: 1,
	});
	const [todayStylePeriod, setTodayStylePeriod] = useState({
		TodaysStylesPeriod: "",
		postNum: 0,
	});

	const onChange = (e) => {
		const { value, name } = e.target;
		if (name === "TodaysStylesPeriod") {
			setTodayStylePeriod({
				...todayStylePeriod,
				[name]: value,
			});
		}
		if (name === "TodaysStylesPeriod" || name === "SearchPeriod") {
			setFeedState({
				...feedState,
				[name]: value + "T00:00:00.000Z",
			});
		} else {
			setFeedState({
				...feedState,
				[name]: Number(value),
			});
		}
	};

	const onShopReset = (e) => {
		e.preventDefault();
		setFeedState({
			...feedState,
			shopConstA: 1,
			shopConstB: 1,
			shopConstC: 1,
		});
	};

	const onPostReset = (e) => {
		e.preventDefault();
		setFeedState({
			...feedState,
			postConstA: 1,
			postConstB: 1,
		});
	};

	const onShopResetPriority = async (e) => {
		e.preventDefault();
		const { data: resetShopPriority } = await resetShop();
		if (!resetShopPriority || resetError) {
			toast.error("Error occured while update data.");
			return;
		}
		if (resetShopPriority) {
			toast.success("Sucessfullly Reset Shop Priority!");
			return;
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (
			feedState.BestRankNum === 0 ||
			feedState.shopConstA === 0 ||
			feedState.shopConstB === 0 ||
			feedState.shopConstC === 0 ||
			feedState.postConstA === 0 ||
			feedState.postConstB === 0
		) {
			toast.error("Feed Page : Order values should be bigger than 0.");
			return;
		}
		if (
			feedState.TodaysStylesPeriod === "T00:00:00.000Z" ||
			feedState.SearchPeriod === "T00:00:00.000Z"
		) {
			toast.error("Feed Page : Please select a date");
			return;
		}
		const {
			data: { updateFeedSetting },
		} = await updateFeed({
			variables: feedState,
		});

		if (!updateFeedSetting || updateError) {
			toast.error("Error occured while update data.");
			return;
		}
		if (updateFeedSetting) {
			toast.success("Sucessfullly Update Data!");
			return;
		}
	};

	return (
		<FeedPresenter
			loading={loading}
			data={data}
			setalreadyGetData={setalreadyGetData}
			alreadyGetData={alreadyGetData}
			feedState={feedState}
			setFeedState={setFeedState}
			todayStylePeriod={todayStylePeriod}
			setTodayStylePeriod={setTodayStylePeriod}
			onChange={onChange}
			onShopReset={onShopReset}
			onPostReset={onPostReset}
			onSubmit={onSubmit}
			onShopResetPriority={onShopResetPriority}
		/>
	);
};
