import React, { useState } from "react";
import QuestionPresenter from "./QuestionPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { QUESTION_QUERY, QUESTION_MUTATION } from "./QuestionQueries";

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
      order: "",
      questionType: "",
    },
  ]);
  const [alreadyGetData, setalreadyGetData] = useState(false);
  const { email, pw } = adminState;

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

  const onSubmit = (e) => {
    e.preventDefault();
    updateAdminInfo({
      variables: {
        email: adminState.email,
        pw: adminState.pw,
        questionTypes: questionState,
      },
    });
  };

  console.log("parent");
  console.log(adminState);
  console.log(questionState);

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
      updateAdminInfo={updateAdminInfo}
      mutationLoading={mutationLoading}
      mutationError={mutationError}
      onSubmit={onSubmit}
      setalreadyGetData={setalreadyGetData}
      alreadyGetData={alreadyGetData}
    />
  );
};
