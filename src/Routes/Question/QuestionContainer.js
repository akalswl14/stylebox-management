import React, { useState } from "react";
import QuestionPresenter from "./QuestionPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { QUESTION_QUERY, QUESTION_MUTATION } from "./QuestionQueries";
import { toast } from "react-toastify";

export default () => {
  const { loading, data } = useQuery(QUESTION_QUERY);
  const [
    updateAdminInfo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(QUESTION_MUTATION);

  const [adminState, setAdminState] = useState({
    email: "",
    pw: "",
  });
  const [questionState, setQuestionState] = useState([
    {
      order: 1,
      questionType: "",
    },
  ]);
  const [isDataState, setIsDataState] = useState(false);
  const [alreadyGetData, setalreadyGetData] = useState(false);

  const { email, pw } = adminState;

  const addRow = (e) => {
    e.preventDefault();
    const newData = {
      order: questionState[questionState.length - 1].order + 1,
      questionType: "",
    };
    setQuestionState((prevData) => [...prevData, newData]);
  };

  const deleteRow = (e, order) => {
    e.preventDefault();
    setQuestionState(
      questionState.filter((eachRow) => eachRow.order !== order)
    );
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setAdminState({
      ...adminState,
      [name]: value,
    });
  };

  const onOrderChange = (questionType, e) => {
    const { value } = e.target;
    setQuestionState(
      questionState.map((option) =>
        option.questionType === questionType
          ? { ...option, order: Number(value) }
          : option
      )
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let orderArr = [];
    for (const question of questionState) {
      if (orderArr.includes(question.order)) {
        toast.error("Question Page : Order values should not be the same.");
        return;
      }
      if (question.order === 0) {
        toast.error("Question Page : Order values should be bigger than 0.");
        return;
      }
      if (question.questionType === "") {
        toast.error("Question Page : Write questionType");
        return;
      }
      orderArr.push(question.order);
    }

    if (adminState.email === "") {
      toast.error("Question Page : Write email");
      return;
    }

    if (adminState.pw === "") {
      toast.error("Question Page : Write password");
      return;
    }

    const {
      data: { updateSettingQuestion },
    } = await updateAdminInfo({
      variables: {
        email: adminState.email,
        pw: adminState.pw,
        questionTypes: questionState,
      },
    });

    if (!updateSettingQuestion || mutationError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (updateSettingQuestion) {
      toast.success("Sucessfullly Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return;
    }
  };

  const onTypeChange = (order, e) => {
    const { value } = e.target;
    setQuestionState(
      questionState.map((option) =>
        option.order === order ? { ...option, questionType: value } : option
      )
    );
  };

  return (
    <QuestionPresenter
      loading={loading}
      data={data}
      onChange={onChange}
      onOrderChange={onOrderChange}
      onTypeChange={onTypeChange}
      email={email}
      pw={pw}
      setAdminState={setAdminState}
      setQuestionState={setQuestionState}
      questionState={questionState}
      mutationLoading={mutationLoading}
      mutationError={mutationError}
      onSubmit={onSubmit}
      setalreadyGetData={setalreadyGetData}
      alreadyGetData={alreadyGetData}
      addRow={addRow}
      deleteRow={deleteRow}
      isDataState={isDataState}
      setIsDataState={setIsDataState}
    />
  );
};
