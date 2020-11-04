import React, { useReducer } from "react";
import CreateClassPresenter from "./CreateClassPresenter";
import { useMutation } from "react-apollo-hooks";
import { CREATE_CLASS } from "./CreateClassQueries";
import { toast } from "react-toastify";

export const ClassInfoContext = React.createContext(null);

const initialState = {
  classInfo: {
    className: "",
    category: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CLASSINFO_CHANGE":
      const { name, value } = action.data;
      return {
        classInfo: {
          ...state.classInfo,
          [name]: value,
        },
      };
    default:
      return state;
  }
}

export default () => {
  const [classState, classDispatch] = useReducer(reducer, initialState);

  const [createClass, { error: createError }] = useMutation(CREATE_CLASS);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      classState.classInfo.category === "==choose==" ||
      classState.classInfo.category === ""
    ) {
      toast.error("Please choose a category.");
      return;
    }

    const classUpdateInfo = {
      className: classState.classInfo.className,
      category: classState.classInfo.category,
    };

    const {
      data: { createClassInfo },
    } = await createClass({ variables: classUpdateInfo });

    if (!createClassInfo || createError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (createClassInfo) {
      toast.success("Sucessfullly Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return;
    }
  };
  console.log(classState);
  return (
    <ClassInfoContext.Provider value={{ classState, classDispatch }}>
      <CreateClassPresenter onSubmit={onSubmit} />
    </ClassInfoContext.Provider>
  );
};
