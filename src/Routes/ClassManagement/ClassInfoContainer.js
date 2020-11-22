import React, { useReducer } from "react";
import ClassInfoPresenter from "./ClassInfoPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_CLASS, UPDATE_CLASS } from "./ClassInfoQueries";
import { toast } from "react-toastify";

export const ClassInfoContext = React.createContext(null);

const initialState = {
  classInfo: {},
  isData: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    case "CLASSINFO_CHANGE":
      const { name, value } = action.data;
      return {
        ...state,
        classInfo: {
          ...state.classInfo,
          [name]: value,
        },
      };
    default:
      return state;
  }
}

export default ({ match }) => {
  const [classState, classDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(GET_CLASS, {
    variables: { id: Number(match.params.classId) },
  });
  const [updateClass, { error: updateError }] = useMutation(UPDATE_CLASS);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (classState.classInfo.className === "") {
      toast.error("Please write class name.");
      return;
    }

    const classUpdateInfo = {
      classId: classState.classInfo.classId,
      className: classState.classInfo.className,
      classCategory: classState.classInfo.category,
    };

    const {
      data: { updateClassInfo },
    } = await updateClass({ variables: classUpdateInfo });

    if (!updateClassInfo || updateError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (updateClassInfo) {
      toast.success("Sucessfullly Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return;
    }
  };

  return (
    <ClassInfoContext.Provider value={{ classState, classDispatch }}>
      <ClassInfoPresenter
        loading={loading}
        data={data}
        error={error}
        onSubmit={onSubmit}
      />
    </ClassInfoContext.Provider>
  );
};
