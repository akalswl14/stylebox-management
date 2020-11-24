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
  isCheck: false,
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
        isCheck: false,
      };
    case "CLASSNAME_CHECK":
      return {
        ...state,
        isCheck: action.data.isCheck,
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

    if (!classState.isCheck) {
      toast.error("Invalid class name.");
      return;
    }

    if (
      classState.classInfo.category === "==choose==" ||
      classState.classInfo.category === ""
    ) {
      toast.error("Please choose a category.");
      return;
    }

    if (classState.classInfo.className === "") {
      toast.error("Please write class Name.");
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
      }, 1200);
      return;
    }
  };
  return (
    <ClassInfoContext.Provider value={{ classState, classDispatch }}>
      <CreateClassPresenter onSubmit={onSubmit} />
    </ClassInfoContext.Provider>
  );
};
