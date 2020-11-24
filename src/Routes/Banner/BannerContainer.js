import React, { useReducer } from "react";
import BannerPresenter from "./BannerPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_BANNERS, UPDATE_BANNERS } from "./BannerQueries";
import { toast } from "react-toastify";

export const BannerContext = React.createContext(null);

const initialState = {
  BannerData: [],
  isDataUpdated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    case "CREATE_BANNER":
      return {
        BannerData: state.BannerData.concat(action.data),
        isDataUpdated: true,
      };
    case "DELETE_BANNER":
      return {
        BannerData: state.BannerData.filter(
          (eachTag) => eachTag.id !== action.data.id
        ),
        isDataUpdated: true,
      };
    case "UPDATE_BANNER":
      return {
        BannerData: state.BannerData.map((eachData) => {
          if (eachData.id === action.data.id) {
            return action.data;
          } else return eachData;
        }),
        isDataUpdated: true,
      };
    default:
      return state;
  }
}

export default () => {
  const [BannerState, BannerDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(GET_BANNERS);
  const [updateBanner, { error: mutationError }] = useMutation(UPDATE_BANNERS);

  const onSubmit = async (e) => {
    e.preventDefault();
    let orderArr = [],
      eventIdArr = [],
      mutationData = [];
    if (BannerState.BannerData.length <= 0) {
      toast.error("You have to choose 1 item at least.");
      return;
    }
    if (BannerState.BannerData.length > 10) {
      toast.error("Up to 10 Banners can be registered.");
      return;
    }
    for (const eachBanner of BannerState.BannerData) {
      if (orderArr.includes(Number(eachBanner.order))) {
        toast.error("Order values should not be the same.");
        return;
      }
      if (Number(eachBanner.order <= 0)) {
        toast.error("Order values should be bigger than 0.");
      }
      if (eventIdArr.includes(eachBanner.eventId)) {
        toast.error("Event should not be the same.");
        return;
      }
      if (Number(eachBanner.eventId) <= 0) {
        toast.error("You have to choose event.");
        return;
      }
      orderArr.push(Number(eachBanner.order));
      eventIdArr.push(eachBanner.eventId);
      mutationData.push({
        id: eachBanner.eventId,
        order: Number(eachBanner.order),
      });
    }
    mutationData.sort((a, b) => a.order - b.order);
    const {
      data: { updateSettingEventBanner },
    } = await updateBanner({
      variables: {
        events: mutationData,
      },
    });
    if (!updateSettingEventBanner || mutationError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (updateSettingEventBanner) {
      toast.success("Sucessfully Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      return;
    }
  };

  return (
    <BannerContext.Provider value={{ BannerDispatch, BannerState }}>
      <BannerPresenter
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        data={data}
      />
    </BannerContext.Provider>
  );
};
